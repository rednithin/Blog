+++
title = "Orange Pi 4B Armbian Configuration"
description = "Orange Pi 4B Armbian Configuration"
template = "page.html"
date = 2020-09-12
[taxonomies]
tags = ["orange pi", "armbian"]
+++

Just a list of things that I must do after a fresh install of Armbian on my OrangePi4B+.

<!-- more -->

- [Cups](#cups)
- [Zsh](#zsh)
  - [Installation](#installation)
  - [Change shell for user](#change-shell-for-user)
  - [Post Install](#post-install)
- [Fstab](#fstab)
- [NFS Configuration](#nfs-configuration)
- [Samba Configuration](#samba-configuration)
- [Starship](#starship)
  - [Installation](#installation-1)
- [Zerotier](#zerotier)
  - [Installation](#installation-2)
  - [Joining](#joining)
  - [Enabling Daemon](#enabling-daemon)
- [Rossa](#rossa)


# Cups

Cups is installed by default on Armbian, but we must enable `remote access` to admin and also enable the `sharing` of printers. In case of a HP printer it is advised to install `hplip` as well.

```bash
sudo cupsctl --remote-admin --remote-any --share-printers
sudo usermod -a -G lpadmin $USER
sudo apt-get install hplip
```

In your desktop/laptop you must enable the following service so the printers recognized by your OrangePi are discovered automatically.

```bash
sudo systemctl status cups-browsed.service
```


# Zsh

Before we proceed with this [antibody](https://getantibody.github.io/) must be installed either via the script.
Or by using `dpkg` with `.deb` release in their Github releases page.

## Installation

```bash
sudo apt-get install zsh
```

## Change shell for user

```bash
chsh -s /bin/zsh
```

## Post Install

- Copy over your config file to `~/.zshrc`.
- Then we need to copy over the `~/.zsh_plugins.txt` file with the antobody plugins

Once the above commands are run we execute the following

```bash
antibody bundle < .zsh_plugins.txt > .zsh_plugins.sh
```


# Fstab

We need to run `sudo blkid` to get the UUID of all the devices.
We can then use this UUID in `/ets/fstab`

```fs
UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx       /mnt/Documents  ext4 defaults 0 1
```
> Replace `x's` with a valid UUID from `blkid` command.


# NFS Configuration

We must first install the kernel server with the following command.

```bash
sudo apt-get install nfs-kernel-server
```

Then in `/etc/exports` we can give read/write access to the NFS drive depending on the IP like so

```
/mnt/Documents <write-ip>(rw,all_squash,insecure,async,no_subtree_check,anonuid=0,anongid=0) *(ro,all_squash,insecure,async,no_subtree_check,anonuid=0,anongid=0)
```

> Replace `<write-ip>` with a valid IP address.

Then run the following to restart the daemon

```bash
sudo systemctl restart nfs-server.service
```


# Samba Configuration

Install samba via `armbian-config` TUI.

After installation in `/etc/samba/smb.conf` add the following code to expose a directory.

```conf
[OPi4BFS]
  comment = Orange Pi FileSystem
  path = /mnt/Documents
  read only = yes
  guest ok = yes
```

And modify the hosts allow command in the same config file under `[global]`

```conf
hosts allow = 192.168.0. <another-ip-1> <another-ip-2> localhost
```

> Replace `<another-ip-i>'s` with valid IP addresses.

Then run the following command to restart the service

```bash
sudo systemctl restart smbd.service
```

# Starship

Before we proceed with the installation [Rust](https://rustup.rs/) must be installed. 

## Installation

```bash
sudo apt-get install pkg-config
cargo install starship
```

> Before installing ensure that max frequency of CPU is reduced and governer changed to `conservative` using `armbian-config` TUI to stop it from overheating.

After that edit your config in `~/.config/starship.toml`


# Zerotier

## Installation

```bash
curl -s https://install.zerotier.com | sudo bash
```

## Joining

```bash
sudo zerotier-cli join <network-id-here>
```

> Replace `<network-id-here>` with the actual network ID. 

## Enabling Daemon

```bash
sudo systemctl enable zerotier-one
sudo systemctl start zerotier-one
```

# Rossa

```bash
sudo snap install rossa --devmode --edge
```

> Rossa is a SimpleHTTPServer made by myself in Rust.
terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

variable "do_token" {}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "web" {
  name     = "web-1"
  region   = "FRA1"
  size     = "s-1vcpu-1gb"
  image    = "ubuntu-24-04-x64"
  ssh_keys = ["fa:40:c5:5d:5a:ec:7f:68:35:7b:0b:23:bc:98:0f:5b"]
}

output "droplet_ip" {
  value = digitalocean_droplet.web.ipv4_address
}

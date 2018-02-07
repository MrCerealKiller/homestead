_(Note: This README is intended for the initial release of the system. Because
  it is in pre-release right now, not all features may be implemented)_

# Welcome to the Homestead Project!

**This open source project aims to create the most flexible environment to
interface with your IoT devices.**

In its current state (v1.0), Homestead can provide a convenient hub for all of
your wifi-based IoT projects. Allowing you to store data, communicate directly
with a device, and create custom interfaces that automatically perform a task;
this system is extremely versatile. To use Homestead yourself, you can use the
main public Homestead servers at <http://homestead.tech> or you can run your
own local homestead server.

## Features
- Easily connect to any device by storing the IP address and Port number
- A convenient hub displays basic information about all devices
- Create custom data channels that can either live update, log, or both
- Use pre-made interfaces (buttons, switches, etc.) to automagically send
commands to your devices
- Use pre-made interfaces ("digital" displays, meters, etc.) to automagically
display received data, while a listener is active (limited use on public servers)
- Make your own interfaces from the ground up, using javascript, and run them
for limitless possibilities (limited use on public servers)

## Getting Started

#### For Public Users:
_(Note for security, performance, and storage reasons, not all features are
  available on the public servers. If you want ultimate control over your
  projects then running your own homestead server may be preferable.)_

Using Homestead is as simple as creating an account and adding a device!
1. Go to <http://homestead.tech>
2. Register an account
3. Add a device from the dashboard or 'Device Settings'
4. The rest is up to you! You can click on your newly added device from the
dashboard, and see many features to add and options to configure.

It is important to note that when using a public server, **local devices** can
only be used when on the same network. If you'd like to access these devices
remotely, you'll need to enable port-forwarding (assuming you understand the
consequences of doing so).

#### For Running Your Own Homestead Server

Streamlining this feature is currently under development. It is always possible
to clone the repository and set everything up yourself.

Generally, on linux:
1. `git clone https://github.com/MrCerealKiller/homestead-project.git`
2. `cd homestead-project`
3. `git checkout localhost`
4. Ensure all Dependencies are properly installed
5. `npm start`
6. _(Optional)_ Enable port-forwarding on both your host machine and router.

## Developers
If you'd like to contribute, the project is open-source, and we welcome anyone
who is interested in making this an expansive and versatile platform!

[Click here to join our slack workplace.](https://join.slack.com/t/homestead-chat/shared_invite/enQtMzExMDQwNDQwNDA0LWZkN2M1NDQ2YTE5YjVmNmJlNDI2MmIwYWY3MmE0Njg1MjViZDZjMWM1NDQxNjhiZjk2NjY5YTE3ZGEwYjA3ZmI)

Some git notifications and build notifications are streamlined here instead of
using emails. Though not mandatory to join, it is the easiest place for actually
conversing about the project (as opposed to 9000+ comment chains).

## License
Copyright (c) 2018 Jeremy Mallette
Licensed under the MIT License.

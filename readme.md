# wach
> prevent your mac from going to sleep when closing the lid. 👀.

[![npm version](https://badge.fury.io/js/%40garygrossgarten%2Fwach.svg)](https://badge.fury.io/js/%40garygrossgarten%2Fwach)
![](https://img.shields.io/david/garygrossgarten/wach.svg?style=flat)
![](https://img.shields.io/npm/l/@garygrossgarten/wach.svg?style=flat)

This is a simple cli tool to prevent your MacBook from going to sleep when closing the lid. 
Use it instead of running tools that require a Kernel Extension. 

*Tested on macOS Mojave 10.14.2*


![](header.png)

## Installation

```sh
npm install -g @garygrossgarten/wach
```

## Usage example
<b>Enable</b> sleep prevention ☕
```sh
wach enable
```
If you want to <b>disable</b> sleep prevention again 🛏 
```sh
wach disable
```

To get a report of all the current Power Management settings
```sh
wach report
```

## Development setup

1. Clone the repository and cd into the directory
2. run `npm install`
3. run `npm run build`
4. run the application by using `node .` or `npm run start`   

## License

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/garygrossgarten/wach](https://github.com/garygrossgarten/wach/)

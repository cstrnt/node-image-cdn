# node-image-cdn

A small image CDN built on Node &amp; Express.js

# Installation

Install node-image-cd globally

```
npm install -g node-image-cdn
```

# Usage

To run the tool locally simply type

```
node-cdn
```

This will start the service on Port `5555`.

## CLI usage

```
json-server [options] <source>

Options:
  --output, -o    Path for the uploaded files
  [default: "uploads"]
  --port, -p    Set port
  [default: 5555]
  --width, -w    Set the width for the output images
  [default: undefined]
  --height, -h    Set the height for the output images
  [default: undefined]
  --field, -f    Set the fieldname for the FormData images
  [default: image]

Examples:
  node-cdn
  node-cdn --port 3000
  node-cdn -o ./static/my-files
  node-cdn -w 200 -h -200 --field "Avatar"

https://github.com/cstrnt/node-image-cdn
```

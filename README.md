# RemDapp

**RemDapp** is a cross-platform remote desktop controlling application that allows users to access and control a remote computer from anywhere in the world.

## About :dart:
RemDapp enables users to remotely control a computer by entering the device's connection ID. It streams the remote device's screen video and audio, allowing interactive control through mouse movements and keyboard inputs, reflecting these actions on the remote computer.

## Demo
Due to the large size of executable files (>200MB), they are not uploaded to this repository. Instructions for generating executables for Windows, macOS, and Linux are provided below.

## RemDapp Features
- **Screen Sharing**: Share screen video and audio with a remote user.
- **Screen Control**: Control the remote user's keyboard and mouse.

## Built Using :bulb:
- **Electron**: For building the desktop application.
- **PeerJs**: For real-time screen video transmission.
- **Socket.io**: For emitting mouse and keyboard events.
- **RobotJs**: For triggering mouse movements and keystrokes on the remote device.
- **NodeJs**: For creating a custom P2P server with WebSockets.
- **React**: For reusable design components.
- **Redux Toolkit**: For handling React states.
- **TailwindCSS**: For designing the user interface.
- **Mongoose**: For creating and authenticating user accounts.

## Running Project
To run this project, follow these steps:

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone '#'
   cd #
   ```

2. Set up the server:
   ```bash
   cd server
   npm install
   npm start
   ```
   This starts the Node.js server. You should see **Server started** in your terminal.

3. Set up the desktop app:
   ```bash
   cd app
   npm install
   npm start
   ```
   This runs the React code. Note: This is a desktop app, not a web app.

4. Launch the Electron desktop app in two terminals:
   ```bash
   npx electronmon .
   ```
   You should see two desktop apps launched.

## Common Bugs For Windows
To prevent installation issues on Windows:

1. Install Visual Studio Build Tools for 'Desktop development with C++', 'MSBuild', 'Windows 10 SDK' from [here](https://visualstudio.microsoft.com/visual-cpp-build-tools/).
2. Install Python v2.7.3 as v3.x.x is not supported. Get it from [here](https://robotjs.io/docs/building).
3. Ensure necessary Python packages are installed:
   ```bash
   python -m ensurepip --upgrade
   python -m pip install --upgrade setuptools
   ```
4. Delete `package-lock.json` and clear npm cache:
   ```bash
   npm cache clean --force
   ```
5. Set PowerShell execution policy:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
6. Rebuild RobotJs:
   ```bash
   npx electron-rebuild -f -w robotjs
   ```
   If issues persist, consider downgrading Node.js or referring to RobotJs GitHub issues.

## Generating EXE / APP / Windows Executable Files :memo:
1. Modify `electron.js`:
   ```javascript
   // Comment this line
   // win.loadURL("http://localhost:3000")

   // Uncomment this line
   win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`)
   ```

2. Build the project:
   ```bash
   npm run build
   npx electron-packager .
   ```
   To generate executables for other platforms:
   ```bash
   npx electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]
   ```

### Note
- RobotJs functions are commented in `electron.js` to prevent self-control issues when running two instances on the same computer.
- Tested on Windowd; additional configuration is needed for Linux and macOS.
- To transmit audio via microphone, use `getUserMedia()` instead of `getDisplayMedia()`.

Explore and enjoy seamless remote desktop control with **RemDapp**!


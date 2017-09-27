# XcodeReactDevTools

when I keep `react-devtools` opened, the xcode memory grows fast:

![image](./screenshots/QQ20170927-0@2x.png)

And after I close `react-devtools`, the xcode memory becomes smooth:

![image](./screenshots/QQ20170927-1@2x.png)

reproduction step:

* open `react-devtools` with official app or `react-native-debugger`
* run this project in xcode
* open `Debug JS Remotely`
* view the xcode memory graph
* you should see that the memory grows fast, as time goes on.
* then close `react-devtools`
* you should see that the memory becomes smooth.

Is there something wrong?

memory leak with `react-devtools`?

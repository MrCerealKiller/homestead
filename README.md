## TODO
### General:
- Add Support for timestamping (Note: saving timestamps requires more than just .save())

### Navbar:
- Fix horizontal scroll when navbar is below minimum width
- Add polyfill for Microsoft Edge js "Element.match()" function (used in navbar)
- Remove Account and seetings buttons from navbar when not logged in

### Dashboard:
- Add template for timestamps in table when supported

### SMS Support:
- Get a virtual phone number (TextMagic API?)

### Devices:
- Maybe use the getUserDevices and search for specific device on the frontend?
  * Adding and getting a Device using the Custom ID should be two factor with the user as well. (Maybe fine to simply delete this... It is not currently used)
  * Same for IP address

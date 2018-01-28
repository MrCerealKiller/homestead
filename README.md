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

### Extra Auth:
- When a person performs an action that affects the database, ensure the user
if only targeting items they "own".

### Profile:
- Change Password Implementation

### Devices:
- Maybe use the getUserDevices and search for specific device on the frontend?
  * Adding and getting a Device using the Custom ID should be two factor with the user as well. (Maybe fine to simply delete this... It is not currently used)
  * Same for IP address

### Pages:
- Profile
  * Account Cards - Minimalistic
- Account Settings (Bare Bones)
  * Update Profile
  * Delete Account
  * Network Settings (?)
  * Accordian(?)
- Device Setting (Bare Bones) (Maybe not even needed yet..?)
  * Table of Devices (IP Address, Name, Edit Button, Delete Button)
  * Add a Device
  * Network Settings (?)
- About
  * A bit more information and full disclosure about the service
  * Admin Contact
- Device Page:
  * Detailed Breakdown
  * Serial Emulator

## Backlog

### New Features:
- Timestamps
  * Add Support for timestamping (Note: saving timestamps requires more than
    just .save())
  * Add template for timestamps in table when supported
- Change Password functionality under account settings
- SMS Support:
  * Get a virtual phone number (TextMagic API?)
  * Add options accessible under device settings
  * Add functionality that send sms notifications
- Extra Auth:
  * When a person performs an action that affects the database, ensure the user
  if only targeting items they "own".

### Minor:
- Add polyfill for Microsoft Edge js "Element.match()" function (used in navbar)

### Pages to Implement:
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
- Device Page:
  * Detailed Breakdown
  * Serial Emulator

### Improve Responsiveness:
- NavbarComponent
  * Fix horizontal scroll when navbar is below minimum width
  * On small media, reduce size of bar, icons, and title
  * On small media, reduce double icones to one icon and nest in dropdown
- Dashboard Table
  * On small media, scroll viewport
- Whole Page
  * Not all elements scale well (e.g. the homestead explanation leaves a gap)
  * Wrap headers in containers such that overflow extends the container

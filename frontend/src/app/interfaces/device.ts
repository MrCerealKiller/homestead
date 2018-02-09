export interface Device {
  _id?: String;
  customId: String;
  user?: String;
  deviceService: String;
  lastIpAddress: String;
  lastStatusUpdate?: String;
  dateLastUpdated?: String;
}

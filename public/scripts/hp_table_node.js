/*
 * Summary Table Handler for the H0M3ST3AD Project
 * Author: Jeremy Mallette
 * Last Updated: 10/12/2017
 */

var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var mdburl = "mongodb://localhost:27017/devices";

var devices = new Array();
var error;

MongoClient.connect(mdburl, function(err, db) {
    if (err)
    {
        error = "Could not connect to the server.";
    }
    else
    {
        var collection = db.collection("devices");

        collection.find({}).toArray(function(err, result) {
            if (err)
            {
                error = "Database error : Could not retrieve devices";
            }
            else if (result.length)
            {
                devices = result;
            }
            else
            {
                error = "Database error : No entries were found";
            }
        });

        db.close();
    }
});

/* May use later...
var hp_table_element = document.getElementById("hp_table");

// Setup Devices ---------------------------------------------------------------
class Device
{
    constructor(id, service)
    {
        this.id = id;
        this.service = service;
        this.status = "Not Connected";
        this.last_update = "Not Connected";
    }

    fill_summary_row()
    {
        return
    }
}*/

// Handlebars Template for HTML ------------------------------------------------
var row = `
    <tr>
        <td>{{id}}</td>
        <td>{{service}}</td>
        <td>{{status}}</td>
        <td>{{last_update}}</td>
    </tr>
`;

//var row_template = Handlebars.compile(row);

// Load All Devices Into HTML Table --------------------------------------------
var data
var row_instance;
var i;
for (i = 0; i < devices.length; i++)
{
    row_instance = row_template({id: devices[i].id,
                                 service: devices[i].service,
                                 status: devices[i].status,
                                 last_update: devices[i].last_update});
    data += row_instance;
}

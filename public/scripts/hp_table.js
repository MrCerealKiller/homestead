/*
 * Summary Table Handler for the H0M3ST3AD Project
 * Author: Jeremy Mallette
 * Last Updated: 10/12/2017
 */

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
}

var devices = new Array();

// For Debugging
devices.push(new Device("ESP-001", "Automated Garden"));
devices.push(new Device("ESP-002", "Security System"));
devices.push(new Device("ESP-003", "Stock Analysis"));

// Handlebars Template for HTML ------------------------------------------------
var row = `
    <tr>
        <td>{{id}}</td>
        <td>{{service}}</td>
        <td>{{status}}</td>
        <td>{{last_update}}</td>
    </tr>
`;

var row_template = Handlebars.compile(row);

// Load All Devices Into HTML Table --------------------------------------------
var row_instance;
var i;
for (i = 0; i < devices.length; i++)
{
    row_instance = row_template({id: devices[i].id,
                                 service: devices[i].service,
                                 status: devices[i].status,
                                 last_update: devices[i].last_update});
    hp_table_element.innerHTML += row_instance;
}

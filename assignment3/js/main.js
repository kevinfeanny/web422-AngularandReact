/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: _Kevin Feanny_____________________ Student ID: ____045050036__________ Date: 11/10/2018_____________
*
*
********************************************************************************/ 
const urlString = "https://pure-cove-37992.herokuapp.com/";

var viewModel = {
    teams:ko.observableArray([]),
    employees:ko.observableArray([]),
    projects:ko.observableArray([])    
};
// show	generic modal
function showGenericModal(title, message)
{
    
    $("#genericModal").modal ({
        backdrop: 'static', // disable clicking on the backdrop to close
        keyboard: false, // disable using the keyboard to close
    });
    $("#myModalTitle").empty();
    $("#myModalMessage").empty();
    $("#myModalTitle").text(title);
    $("#myModalMessage").html(message);

}function initializeTeams()
{
   
    // return a Promise
    return new Promise( function(resolve, reject) {
        // request data to REST server with jQuery-ajax
        $.ajax({
            url: urlString + "teams-raw",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {
            // Assign the results to the "viewModel" variable           
            viewModel.teams = ko.mapping.fromJS(data);
            
            // If the AJAX call successes, return resolve function            
            resolve();
        })
        .fail(function(err){
            // If the AJAX call fails, return reject function
                          
            reject("Error loading the team data.");
        });
    });
}
function initializeEmployees()
{
    
    return new Promise( function(resolve, reject) {
        // request data to REST server with jQuery-ajax
        $.ajax({
            // according to data-query type, request data to REST
            url: urlString + "employees",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {
            // Assign the results to the "viewModel" variable   
            viewModel.employees = ko.mapping.fromJS(data);
        
    
            // If the AJAX call successes, return resolve function             
            resolve();
        })
        .fail(function(err){
            // If the AJAX call fails, return reject function
                       
            reject("Error loading the team data.");
        });
    });
}
function initializeProjects()
{
    
    return new Promise( function(resolve, reject) {
        // request data to REST server with jQuery-ajax
        $.ajax({
            url: urlString + "projects",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {
            // Assign the results to the "viewModel" variable  
            viewModel.projects = ko.mapping.fromJS(data);
            
            resolve();
        })
        .fail(function(err){
            // If the AJAX call fails, return reject function
            
            reject("Error loading the team data.");
        });
    });
}
function saveTeam()
{
    // Set the value of this to a local variable
    // "this" in the context of this function will be a 
    // single observable "team" object from our viewModel.teams array 
    // - this is because this function is invoked from a "click" 
    //   binding from the view (index.html)
    let currentTeam = this;
     
            
    $.ajax({
        url: urlString + "team/" + currentTeam._id(),
        type: "PUT",
        data: JSON.stringify ( // create an object literal
            {
                "Projects": currentTeam.Projects(), 
                "Employees": currentTeam.Employees(), 
                "TeamLead": currentTeam.TeamLead() 
            }
        ),
        contentType: "application/json"
    })
    .done(function (data) {
        showGenericModal("Success", "[" 
        + currentTeam.TeamName() 
        + "] Updated Successfully");
    })
    .fail(function (err) {
        showGenericModal("Error", "Error updating the team information.");
    });
}
$(document).ready(function(){ // start jQuery

    // Promises and Chaining Promises are used 
    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function() {
        // apply the bindings (applybindings) to the document using the "viewModel" 
        ko.applyBindings(viewModel);
        // Use jQuery to select all "select" elements with class 
        // "multiple" and invoke the following method:.multipleSelect({ filter: true });
        $("select.multiple").multipleSelect({ filter: true });         
        // Use jQuery to select all "select" elements with class "single" 
        // and invoke the following method: .multipleSelect({ single: true, filter: true });
        $("select.single").multipleSelect({ single: true, filter: true });
    })
    .catch(function(err) {
        console.log("error: " + err);
        showGenericModal('Error', err);
    });
});
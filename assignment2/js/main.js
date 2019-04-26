/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: __Kevin Feanny____________________ Student ID: _045050036_________________ Date: _____27/9/18_______________
*
*
********************************************************************************/
const urlString = "https://pure-cove-37992.herokuapp.com/";

$(document).ready(function(){

    
    let employeesModel; 

    // Lodash template to show data on the screen
    let rowTemplate = _.template(
        '<% _.forEach(employees, function(employee) { %>' +
            '<div class="row body-row" data-id=<%- employee._id %>>' + 
                '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' + 
                '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' + 
                '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' + 
            '</div>' +
        '<% }); %>');

    	
    // Ajax topopulate employee model
    function initializeEmployeesModel()
    {
        console.log("InitializeEmployeesModel()");

        
        $.ajax({
        
            url: urlString + "employees",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {
           
            employeesModel = _.take(data, 300);
          
            refreshEmployeeRows(employeesModel);
        })
        .fail(function(err){
        
            console.log("error: " + err.statusText);                
            showGenericModal('Error', 'Unable to get Employees');
        });
    }

    
    function showGenericModal(title, message)
    {
        console.log("ShowGenericModal()" + title);
        console.log("ShowGenericModal()" + message);
        $("#genericModal").modal ({
            backdrop: 'static', 
            keyboard: false, 
        });
        $("#myModalTitle").empty();
        $("#myModalMessage").empty();
        $("#myModalTitle").text(title);
        $("#myModalMessage").html(message);
    }
    
    function refreshEmployeeRows(employees)
    {
        console.log("RefreshEmployeeRows()");         
        let rows = rowTemplate({ 'employees': employees});
        let employeeTable = $("#employees-table");
        employeeTable.empty();
        employeeTable.append(rows);
    }

    
    function getFilteredEmployeesModel(filterString)
    {
        console.log("GetFilteredEmployeesModel()");              
        let filterData = _.filter(employeesModel, function(employee) {
            
            if(employee.FirstName.toUpperCase().indexOf(filterString.toUpperCase()) != -1 || 
                employee.LastName.toUpperCase().indexOf(filterString.toUpperCase()) != -1 || 
                employee.Position.PositionName.toUpperCase().indexOf(filterString.toUpperCase()) != -1)
            {
                return true;
            }
            else
            {
                return false;
            }
        });
        return filterData;
    }

 
    function getEmployeeModelById(id)
    {
        console.log("GetEmployeeModelById()");            
        let findIdx = _.findIndex(employeesModel, function(employee) { 
            return employee._id === id; 
        });

     
        if (findIdx != -1) return _.cloneDeep(employeesModel[findIdx]);
        else null;
    }

    initializeEmployeesModel();
    
    // wiring up the "keyup" event
    $("#employee-search").on("keyup", function() {

        console.log("$(#employee-search).on(keyup, function() {");
        let searchText = $("#employee-search").val(); 
       
        refreshEmployeeRows(getFilteredEmployeesModel(searchText));
    });

    $(".bootstrap-header-table").on("click", ".body-row", function() {

        console.log("$(.bootstrap-header-table).on(click, .body-row, function() {");
        let $empId = $(this).attr("data-id");
        let clickedEmpoyee = getEmployeeModelById($empId);

        let hireDateStr = moment(clickedEmpoyee.hireDate).format("LL");            
        clickedEmpoyee.HireDate = hireDateStr;

        let modalTemplate = _.template(
            '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %> <%- employee.AddressState %> <%- employee.AddressZip %><br>' +
            '<strong>Phone Number:</strong> <%-employee.PhoneNum %><br>' + 
            '<strong>Hire Date:</strong> <%- employee.HireDate %>');
        
       
        showGenericModal(
            clickedEmpoyee.FirstName + " " + clickedEmpoyee.LastName, 
            modalTemplate({ 'employee':clickedEmpoyee })
        );
    });
});
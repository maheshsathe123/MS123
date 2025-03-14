/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
// define([ 'N/record'], 
//     function(record) {
    
//     function saveRecord(context) {
//         var currentRecObj = context.currentRecord;
//         var internalValue = currentRecObj.getValue({ fieldId: 'custrecord_internal' }); 
//         var externalValue = currentRecObj.getValue({ fieldId: 'custrecord_external' }); 

       
//         if (internalValue == '' &&  externalValue == '' ) {
//             alert("Please enter value in either Internal or External");
//             return false; 
//         }

      
//        else if (internalValue && externalValue) {
//           alert("You cannot select both");
//             return false; 
//         }

//         return true; 
//     }

//     return {
//         saveRecord: saveRecord
//     };
// });
// /**
//  * @NApiVersion 2.x
//  * @NScriptType ClientScript
//  */
define([ 'N/record'], function ( record) {

    function saveRecord(context) {
        //Get the current invoice record:
        var currentRecord = context.currentRecord;

        //retrive the values of Both the fileds:
        var internal = currentRecord.getValue({
            fieldId: 'custrecord_internal'
        });
        var external = currentRecord.getValue({
            fieldId: 'custrecord_external'
        });
 //
        //Check if both Internal and External fields are empty:
        if (internal == '' &&  external == '') {
            alert('Please enter value in either Internal or External');
            return false; 
        }

        //Check if both Internal and External fields are filled:
        if (internal&& external) {
            alert('You cannot select both Internal and External');
            return false; 
        }

        //If only one field is filled then, allow the users to save the record:
        return true;
    }




    return {
        saveRecord: saveRecord,
     
    };
});
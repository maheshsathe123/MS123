/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(["N/record", "N/ui/serverWidget"], function (record, serverWidget) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      // Capture the Purchase Order ID from the request parameters
      var poId = context.request.parameters.poId;

      // Check if the Purchase Order ID is provided
      if (!poId) {
        throw new Error("Purchase Order ID is missing");
      }

      // Load the Purchase Order record
      var poRecord = record.load({
        type: "purchaseorder", // or 'purchaseorder'
        id: poId,
      });

      // Create the Suitelet form
      var form = serverWidget.createForm({
        title: "Project Information",
      });

      // Add fields for Project Name, Start Date, and Status
      form.addField({
        id: "custpage_project_name",
        type: serverWidget.FieldType.TEXT,
        label: "Project Name",
      });

      form.addField({
        id: "custpage_project_start_date",
        type: serverWidget.FieldType.DATE,
        label: "Project Start Date",
      });

      form
        .addField({
          id: "custpage_poid",
          type: serverWidget.FieldType.TEXT,
          label: "Purchase Order ID",
        })
        .updateDisplayType({
          displayType: serverWidget.FieldDisplayType.HIDDEN,
        }).defaultValue = poId; // Set the default value to the PO ID

      var statusField = form.addField({
        id: "custpage_project_status",
        type: serverWidget.FieldType.SELECT,
        label: "Project Status",
      });
      statusField.addSelectOption({
        value: "not_started",
        text: "Not Started",
      });
      statusField.addSelectOption({
        value: "in_progress",
        text: "In-progress",
      });
      statusField.addSelectOption({ value: "completed", text: "Completed" });

      // Add a Submit button
      form.addSubmitButton({ label: "Submit" });

      // Write the form to the response
      context.response.writePage(form);
    }

    // Handle form submission
    else if (context.request.method === "POST") {
      // Capture the data entered in the form
      var projectName = context.request.parameters.custpage_project_name;
      var projectStartDate =
        context.request.parameters.custpage_project_start_date;
      var projectStatus = context.request.parameters.custpage_project_status;

      // Load the Purchase Order record again (or another action as needed)
      var poId = context.request.parameters.custpage_poid;
      var poRecord = record.load({
        type: record.Type.PURCHASE_ORDER,
        id: poId,
      });

      // Set the custom fields on the Purchase Order
      poRecord.setValue({
        fieldId: "custbodyproject_name",
        value: projectName,
      });

      log.debug("projectStartDate", typeof projectStartDate);
      var d = projectStartDate.trim();
      log.debug("pd", typeof d);

      poRecord.setValue({
        fieldId: "custbody_project_start_date",
        value: "20-07-2024",
      });

      //   if (projectStartDate) {
      //     var formattedDate = new Date(projectStartDate);
      //     if (!isNaN(formattedDate.getTime())) {
      //       // Set the custom fields on the Purchase Order
      //       poRecord.setValue({
      //         fieldId: "custbody_project_start_date",
      //         // value: formattedDate,
      //         value: projectStartDate,
      //       });
      //     } else {
      //       throw new Error("Invalid Project Start Date");
      //     }
      //   }

      // log.debug(projectStatus);

      switch (projectStatus) {
        case "not_started":
          poRecord.setValue({
            fieldId: "custbody_project_status",
            value: 1,
          });
          break;
        case "in_progress":
          poRecord.setValue({
            fieldId: "custbody_project_status",
            value: 2,
          });
          break;
        case "completed":
          poRecord.setValue({
            fieldId: "custbody_project_status",
            value: 2,
          });
          break;
        default:
          log.debug("Select");
      }

      // Save the record
      poRecord.save();

      // Redirect or close the popup as needed
      //   context.response.write(
      //     "Project Information has been saved successfully."
      //   );

      context.response.write(
        "<script>window.opener.location.reload();window.close();</script>"
      );
    }
  }

  return {
    onRequest: onRequest,
  };
});

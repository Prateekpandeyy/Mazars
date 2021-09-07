// const column = [
//     {
//       headerName: "S.No",
//       field: "",
//       valueGetter: hashValueGetter,
//       sortable: true,
//       width: 80,
//     },
//     {
//       headerName: "Date of Query",
//       field: "created",
//       sortable: true,
//       width: 140,
//     },
//     {
//       headerName: "Query No",
//       field: "assign_no",
//       sortable: true,
//       width: 140,
//       cellRendererFramework: (params) => {
//         return (
//           <div>
//             <Link to={`/customer/my-assingment/${params.data.id}`}>
//               {params.data.assign_no}
//             </Link>
//           </div>
//         );
//       },
//     },
//     {
//       headerName: "Proposal No",
//       field: "proposal_number",
//       sortable: true,
//       width: 140,
//     },
//     { headerName: "Category", field: "parent_id", sortable: true, width: 140 },
//     {
//       headerName: "Sub Category",
//       field: "cat_name",
//       sortable: true,
//       width: 160,
//     },
//     {
//       headerName: "Date of Proposal",
//       field: "DateofProposal",
//       sortable: true,
//       width: 170,
//     },
//     {
//       headerName: "Date of acceptance of Proposal",
//       field: "cust_accept_date",
//       sortable: true,
//       width: 170,
//     },
//     { headerName: "Status", field: "status", sortable: true, width: 140 },
//     {
//       headerName: "Proposed Amount",
//       field: "ProposedAmount",
//       sortable: true,
//       width: 140,
//     },
//     {
//       headerName: "Amount Accepted",
//       field: "accepted_amount",
//       sortable: true,
//       width: 140,
//     },
//     {
//       headerName: "Amount Paid",
//       field: "paid_amount",
//       sortable: true,
//       width: 140,
//     },
//     {
//       headerName: "Date of Payment",
//       field: "cust_paid_date",
//       sortable: true,
//       width: 140,
//     },
//     {
//       headerName: "Amount Outstanding",
//       field: "paid_amount",
//       sortable: true,
//       width: 140,
//       cellRendererFramework: (params) => {
//         <div>
//           {
//               params.data.paid_amount,
//               params.data.accepted_amount
            
//           }
//         </div>;
//       },
//     },
//     {
//       headerName: "Date of Completion",
//       field: "name",
//       sortable: true,
//       width: 140,
//     },
//     { headerName: "Action", field: "parent_id", sortable: true, width: 140 },
//   ];



// var hashValueGetter = function (params) {
//     return params.node.rowIndex + 1;
//   };

//   const column = [
//     {
//       headerName: "S.No",
//       field: "",
//       valueGetter: hashValueGetter,
//       sortable: true,
//       resizable: true,
//       width: 70,
//     },
//     {
//       headerName: "Date",
//       field: "created",
//       sortable: true,
//       resizable: true,
//       width: 100,
//     },
//     {
//       headerName: "Query No",
//       field: "assign_no",
//       sortable: true,
//       resizable: true,
//       width: 100,
    //   cellRendererFramework: (params) => {
    //     return (
    //       <div>
    //         <Link to={`/admin/queries/${params.data.q_id}`}>
    //           {params.data.assign_no}
    //         </Link>
    //       </div>
    //     );
    //   },
//     },
//     {
//       headerName: "Category",
//       field: "parent_id",
//       sortable: true,
//       resizable: true,
//       width: 100,
//     },
//     {
//       headerName: "Sub Category",
//       field: "cat_name",
//       sortable: true,
//       resizable: true,
//       width: 130,
//     },
//     {
//       headerName: "Proposal No.",
//       field: "proposal_number",
//       sortable: true,
//       resizable: true,
//       width: 130,
//     },
//     {
//       headerName: "Proposal Sent date",
//       field: "DateofProposal",
//       sortable: true,
//       resizable: true,
//       width: 160,
//     },
//     {
//       headerName: "Proposed Amount",
//       field: "ProposedAmount",
//       sortable: true,
//       resizable: true,
//       width: 150,
//     },
//     {
//       headerName: "Proposal Status",
//       field: "status",
//       sortable: true,
//       resizable: true,
//       width: 160,
//     },
//     {
//       headerName: "Amount Accepted",
//       field: "accepted_amount",
//       sortable: true,
//       resizable: true,
//       width: 160,
//     },
//     {
//       headerName: "Assignment Number",
//       field: "",
//       sortable: true,
//       resizable: true,
//       width: 160,
//     },
//     {
//       headerName: "TL name",
//       field: "tl_name",
//       sortable: true,
//       resizable: true,
//       width: 160,
//     },
//   ];
// feedback function
// var qdate = new Date();
//     var dateMnsFive = moment(query[0].exp_delivery_date).add(15, 'day');  
//     var date = dateMnsFive.format("YYYY-MM-DD");
// if(qdate != date){
//     console.log("fined")
// }

// var feedbackdate;  
//  var current3 = moment();
//    if(query.length > 0){
//   var qdate = new Date().getDate().toLocaleString();
//     var dateMnsFive = moment(query[0].exp_delivery_date).subtract(18, 'day');  
//     var date = dateMnsFive.format("YYYY-MM-DD");
// if(qdate != date){
//     console.log("fined")
// }

// console.log(moment().diff(date));
//     }
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useHistory } from "react-router-dom";

function DeleteQuery({ id, setLoading }) {
  const userId = window.localStorage.getItem("userid");
  const history = useHistory();



  //check
  const del = (id) => {


    Swal.fire({
      title: "Are you sure?",
      text: "Want to delete query ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deleted it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    setLoading(true)
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", id);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/deleteQuery`,
      data: formData,
    })
      .then(function (response) {

        if (response.data.code === 1) {
          setLoading(false)
          Swal.fire("", "Query deleted successfully.", "success");
          history.push("/customer/queries");
        } else {
          setLoading(false)
          Swal.fire("Oops...", "Query not deleted", "error");
        }
      })
      .catch((error) => {
     
      });
  };

  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={() => del(id)}>
        Delete
      </button>
    </div>
  );
}

export default DeleteQuery;

{
  /* <i
        className="fa fa-trash"
        style={{
          fontSize: 16,
          cursor: "pointer",
        }}
        
      ></i> */
}

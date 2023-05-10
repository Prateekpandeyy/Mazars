import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Select from "react-select";
import { Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { Card, CardHeader, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

export const getErrorMessage = () => {
  setTimeout(function () {
    Swal.fire({
      title: "Error !",
      html: `<p className="text-danger">Something went wrong. Please try again after some time.</p>`,
    });
  }, 1000);
};

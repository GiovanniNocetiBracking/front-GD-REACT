import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import AdminLayout from "layouts/Admin/Admin.js";

export default function PrivateRoute({ ...props }) {
  const { currentUser } = useAuth();

  return (
    <>
      <Route
        {...props}
        render={(props) => {
          return currentUser ? (
            <AdminLayout {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    </>
  );
}

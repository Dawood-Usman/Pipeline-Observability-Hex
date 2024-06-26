import React, { useState, useEffect } from "react";
import SettingsText from "@/components/atoms/SettingsText";
import { ErrorToast, SuccessToast, WarningToast } from "@/components/atoms/toastUtils/Toast";
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";

const UpdateArgoCDUrl = () => {
  const [argocdURL, setArgocdURL] = useState("");
  const { data, error, loading, fetchData } = useFetch(
    "/api/argocdurl"
  );
  const { postData } = usePost();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setArgocdURL(data.argocdURL);
    }
  }, [data]);


  const handleSubmit = async (e) => {
      e.preventDefault();
    try {
        if (argocdURL) {
            await postData("/api/argocdurl", { argocdURL });
      
          }
        SuccessToast("URL Updated Successfully!");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          ErrorToast(error.response.data.error);
        } else {
          ErrorToast("Error updating URL!");
        }
      }
  };

  useEffect(() => {
    if (data && data.message === "ArgoCD URL Saved successfully") {
      SuccessToast("ArgoCD URL Updated successfully!");
      setArgocdURL("");
    } else if (error) {
      ErrorToast(error);
    }
  }, [data, error]);

  return (
    <div className="flex w-full flex-col p-5 sm:p-2 border rounded-lg border-gray-600 sm:border-none mt-3 sm:mt-0">
      <div className="self-end mb-2">
        <button
          className="bg-purple-600 px-3 py-1 rounded-md"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
      <div className="flex w-full flex-col md:w-[60%] border border-gray-800 self-center shadow shadow-blue-950 p-2 xs:p-10 rounded-lg mt-5">
        <SettingsText
          Heading={"ArgoCD URL Settings"}
          Description={"Update your ArgoCD URL to ensure seamless communication."}
        />
        <div className="w-[100%] flex flex-col my-3">
          <label htmlFor="argocdURL" className="my-2">
            ArgoCD URL
          </label>
          <input
            className="border-2 w-full sm:w-[70%] p-2 h-12 outline-none bg-transparent rounded-lg border-gray-400 focus:border-purple-600"
            placeholder="https://127.0.0.1:8081/api/v1/applications"
            type="text"
            name="argocdURL"
            value={argocdURL}
            onChange={(e) => setArgocdURL(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateArgoCDUrl;
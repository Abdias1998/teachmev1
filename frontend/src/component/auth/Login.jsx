import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
// import { Password } from "primereact/password";
import axios from "axios";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import { useNavigate } from "react-router-dom";
import request from "../../endpoint/request";

export const Login = () => {
  const history = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  // const [backendMessage, setBackendMessage] = useState("");
  const [eye, setEye] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // État pour le chargementz

  function redirectToForget() {
    history("/forget_password");
  }
  function redirectToRegister() {
    history("/register");
  }
  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: getValues("value"),
    });
  };
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  const defaultValues = {
    value: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true); // Activer le chargement lors de la soumission
      const response = await axios.post(
        ` ${request.login}`,
        {
          identifier: data.value,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // setBackendMessage(response.data.message);
        showToast("success", "Success", response.data.message);
        data.value && show();
        reset();
        setTimeout(() => {
          history("/home");
        }, 1000);
      } else {
        // setBackendMessage(response.data.error);
        showToast("error", "Error", response.data.error);
      }
    } catch (error) {
      // setBackendMessage(error.message);
      showToast("error", "Error", error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false); // Désactiver le chargement une fois la réponse obtenue
    }
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  const passwordValue = useWatch({ control, name: "password" });

  return (
    <div
      className="m-auto w-10 md:w-4 mt-6 flex justify-content-center shadow-8  align-items-center align-content-center  "
      style={{ background: "#232323", borderRadius: "12px" }}
    >
      <div className="flex  w-12 justify-content-between  align-items-center align-content-center flex-column ">
        <img
          className="mt-4"
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
          src="./assets/images/fond.png"
          alt=""
          srcset=""
        />
        <h2 className="mt-4">Connexion</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  w-12 justify-content-between  align-items-center align-content-center flex-column "
        >
          <Toast ref={toast} />
          <Controller
            name="value"
            control={control}
            rules={{ required: "Ce champ est requis" }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-input-icon-right">
                  <i
                    // className="pi pi-spin pi-spinner"
                    className="pi pi-user"
                    style={{ marginTop: "1rem" }}
                  />
                  <InputText
                    id={field.name}
                    placeholder="Email ou Pseudo"
                    value={field.value}
                    className={`${classNames({
                      "p-invalid": fieldState.error,
                    })} mt-6 `}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setIsFormValid(!!e.target.value && !!passwordValue);
                    }}
                  />
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "Ce champ est requis" }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-input-icon-right">
                  <i
                    onClick={() => setEye(!eye)}
                    style={{ cursor: "pointer" }}
                    // className="pi pi-spin pi-spinner"
                    className={`${eye ? "pi pi-lock" : "pi pi-unlock"}  `}
                  />

                  <InputText
                    required
                    type={`${eye ? "text" : "password"}`}
                    placeholder="*********"
                    id={field.name}
                    value={field.value}
                    // feedback={true}
                    // toggleMask={true}
                    className={`${classNames({
                      "p-invalid": fieldState.error,
                    })} mt-4   `}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setIsFormValid(!!getValues("value") && !!e.target.value);
                    }}
                  />
                </span>

                {getFormErrorMessage("password")}
              </>
            )}
          />

          <Button
            type="submit"
            style={{ backgroundColor: "#E50913", color: "#fff" }}
            className="m-6 w-6 text-sm md:text-lg mt-4 h-2 "
            icon={isLoading ? "pi pi-spin pi-spinner" : ""}
            iconPos="right"
            label={isLoading ? "Chargement..." : "Se connecter"}
            disabled={!isFormValid || isLoading}
          />
        </form>
        <h5
          style={{ cursor: "pointer" }}
          className="text-center underline"
          onClick={redirectToRegister}
        >
          Vous n'avez pas un compte ? Inscrivez-vous
        </h5>
        <h5
          onClick={redirectToForget}
          style={{ cursor: "pointer" }}
          className="mb-4 mt-2 text-center underline"
        >
          Mot de passe oublié ?
        </h5>
      </div>
    </div>
  );
};

import React from "react";
import { FormButtonsProps } from "./form";
import { Grid } from "@sphinx-ui/core";
import { Button } from "@/components";

const FormButtons = (props: FormButtonsProps) => {
    return (
        <Grid container gap="1rem" justifyContent={props.alignFormButtons || "right"}>
            {props.cancelButtonLabel && (
                <Button
                    buttontype="primary"
                    type="reset"
                    id="cancelBtn"
                    onClick={props.handleCancelButton}
                >
                    {props.cancelButtonLabel}
                </Button>
            )}

            {props.resetButtonLabel && (
                <Button
                    buttontype="secondary"
                    type="reset"
                    id="resetBtn"
                    onClick={props.onResetForm}
                >
                    {props.resetButtonLabel}
                </Button>
            )}

            {props.confirmButtonLabel && (
                <Button buttontype="primary" id="submitBtn" type="submit">
                    {props.confirmButtonLabel}
                </Button>
            )}
        </Grid>
    );
};

export default FormButtons;

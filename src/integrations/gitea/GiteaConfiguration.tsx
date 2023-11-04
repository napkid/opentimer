import { Component } from "solid-js";
import { GiteaIntegrationConfiguration } from ".";
import { IntegrationConfigurationComponentProps } from "../types";
import TextField from "../../components/forms/TextField";


const GiteaConfiguration: Component<IntegrationConfigurationComponentProps<GiteaIntegrationConfiguration>> = props => {
    return <>
        <TextField
            label="Domain"
            name="configuration.domain"
            value={props.configuration?.domain}
        />
    </>
}

export default GiteaConfiguration
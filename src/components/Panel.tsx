import React, { FC, useEffect, useState } from "react";
import { useSessionStorage } from "../hooks";
import "./css/Panel.css";
import { ColorPicker } from "./input/colorPicker/ColorPicker";
import { TextField } from "./input";
import "./css/GlobalStyles.css";

export interface IUserConfig {
  alias: string;
  color: string;
}

export interface IWSMessagePKG extends IUserConfig {
  message: string;
}

interface IPanelProps {
  onChange?: (newValue: IWSMessagePKG) => void;
  onMessageChange?: (newValue: IWSMessagePKG) => void;
}

export const Panel: FC<IPanelProps> = ({
  onChange,
  onMessageChange,
}: IPanelProps) => {
  const defaultConfig: IUserConfig = {
    alias: "Alias",
    color: "#008000",
  };

  const [userConfig, setUserConfig] = useSessionStorage<IUserConfig>(
    "userSettings",
    defaultConfig
  );

  const [message, setMessage] = useState("");

  const socket = new WebSocket("ws://localhost:8999")

  useEffect(() => onChange && onChange({ ...userConfig, message }), [
    message,
    userConfig,

    //test to send info to socket, shows info in backend service. 
    socket.onmessage = (event) => {
      socket.send(JSON.stringify({...userConfig, message}))      
    }
  ]);

  useEffect(() => onMessageChange && onMessageChange({ ...userConfig, message }),
    [message]
  );

  return (
    <div className="panel global-style">
      {/* <FontAwesomeIcon icon={faHome} /> */}
      <ColorPicker
        defaultColor={userConfig.color}
        onChange={(color) => {
          setUserConfig({ ...userConfig, color });
        }}
      />
      <TextField
        placeholder="Alias"
        defaultValue={userConfig.alias}
        onChange={(alias) => setUserConfig({ ...userConfig, alias })}
      />
      <TextField
        placeholder="Message"
        style={{ flexGrow: 2 }}
        onChange={(message) => setMessage(message)}
      />
      <div />
    </div>
  );
};

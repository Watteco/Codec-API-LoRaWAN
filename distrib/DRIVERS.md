## Available WATTECO LoRaWAN TS013 compliant decoders:

*(This `markdown` script is automatically generated. Please do not modify it.)*

<details>
<summary>ATM'O [1.1.4]</summary>

  [NPM: watteco-atm_o](https://www.npmjs.com/package/watteco-atm_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index_1, index_2, pin_state_1, pin_state_2, polarity, edge_selection, debounce_period (ms), poll_period (ms), force_notify
- **pressure (CID: 0x0403)** : pressure (hPa)
- **relative humidity (CID: 0x0405)** : humidity (%RH)
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>CLIM'O [1.1.4]</summary>

  [NPM: watteco-clim_o](https://www.npmjs.com/package/watteco-clim_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **relative humidity (CID: 0x0405)** : humidity (%RH)
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>CLOS'O [1.1.4]</summary>

  [NPM: watteco-clos_o](https://www.npmjs.com/package/watteco-clos_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index, violation_detection, open, polarity, edge_selection, debounce_period (ms), poll_period (ms), force_notify

</details>

<details>
<summary>FLASH'O [1.1.4]</summary>

  [NPM: watteco-flash_o](https://www.npmjs.com/package/watteco-flash_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index, pin_state, polarity, edge_selection, debounce_period (ms), poll_period (ms), force_notify

</details>

<details>
<summary>HYGROTEMP'O [1.1.4]</summary>

  [NPM: watteco-hygrotemp_o](https://www.npmjs.com/package/watteco-hygrotemp_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : violation_detection
- **relative humidity (CID: 0x0405)** : humidity (%RH)
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>HYGROTEMP'O_REMOTE [1.1.4]</summary>

  [NPM: watteco-hygrotemp_o_remote](https://www.npmjs.com/package/watteco-hygrotemp_o_remote)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : violation_detection
- **relative humidity (CID: 0x0405)** : humidity (%RH)
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>IN'O [1.1.4]</summary>

  [NPM: watteco-in_o](https://www.npmjs.com/package/watteco-in_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : main_or_external_voltage (V), disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index_1, index_2, index_3, index_4, index_5, index_6, index_7, index_8, index_9, index_10, pin_state_1, pin_state_2, pin_state_3, pin_state_4, pin_state_5, pin_state_6, pin_state_7, pin_state_8, pin_state_9, pin_state_10, polarity, edge_selection, debounce_period (ms), poll_period (ms), force_notify
- **multi binary inputs (CID: 0x8005)** : pin_state_1, pin_state_2, pin_state_3, pin_state_4, pin_state_5, pin_state_6, pin_state_7, pin_state_8, pin_state_9, pin_state_10
- **ON/OFF (CID: 0x0006)** : output_1, output_2, output_3, output_4

</details>

<details>
<summary>INCLIN'O [1.1.4]</summary>

  [NPM: watteco-inclin_o](https://www.npmjs.com/package/watteco-inclin_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **analog input (CID: 0x000C)** : angle (deg)
- **occupancy (CID: 0x0406)** : occupancy

</details>

<details>
<summary>INDOOR_TEMPERATURE [1.1.4]</summary>

  [NPM: watteco-indoor_temperature](https://www.npmjs.com/package/watteco-indoor_temperature)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>INTENS'O [1.1.4]</summary>

  [NPM: watteco-intens_o](https://www.npmjs.com/package/watteco-intens_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **analog input (CID: 0x000C)** : Irms (A)

</details>

<details>
<summary>LEV'O [1.1.4]</summary>

  [NPM: watteco-lev_o](https://www.npmjs.com/package/watteco-lev_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **analog input (CID: 0x000C)** : 4-20_mA (mA), 0-10_V (V)

</details>

<details>
<summary>MODBUS [1.1.5]</summary>

  [NPM: watteco-modbus](https://www.npmjs.com/package/watteco-modbus)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : main_or_external_voltage (V), disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **multi master/slave answers (CID: 0x8009)** : modbus_frame_series_sent, modbus_frame_number_in_serie, modbus_last_frame_of_serie, modbus_EP0, modbus_EP1, modbus_EP2, modbus_EP3, modbus_EP4, modbus_EP5, modbus_EP6, modbus_EP7, modbus_EP8, modbus_EP9
- **serial interface (CID: 0x8006)** : speed (bps), data_bit, parity, stop_bit
- **serial master/slave protocol (CID: 0x8007)** : modbus_payload_EP0, modbus_payload_EP1, modbus_payload_EP2, modbus_payload_EP3, modbus_payload_EP4, modbus_payload_EP5, modbus_payload_EP6, modbus_payload_EP7, modbus_payload_EP8, modbus_payload_EP9, modbus_slaveID_EP0, modbus_slaveID_EP1, modbus_slaveID_EP2, modbus_slaveID_EP3, modbus_slaveID_EP4, modbus_slaveID_EP5, modbus_slaveID_EP6, modbus_slaveID_EP7, modbus_slaveID_EP8, modbus_slaveID_EP9, modbus_fnctID_EP0, modbus_fnctID_EP1, modbus_fnctID_EP2, modbus_fnctID_EP3, modbus_fnctID_EP4, modbus_fnctID_EP5, modbus_fnctID_EP6, modbus_fnctID_EP7, modbus_fnctID_EP8, modbus_fnctID_EP9, modbus_datasize_EP0, modbus_datasize_EP1, modbus_datasize_EP2, modbus_datasize_EP3, modbus_datasize_EP4, modbus_datasize_EP5, modbus_datasize_EP6, modbus_datasize_EP7, modbus_datasize_EP8, modbus_datasize_EP9

</details>

<details>
<summary>MONIT'O [1.1.4]</summary>

  [NPM: watteco-monit_o](https://www.npmjs.com/package/watteco-monit_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **analog input (CID: 0x000C)** : 0-100_mV (mV), 0-70_V (V)

</details>

<details>
<summary>MOVE'O_LITE [1.1.4]</summary>

  [NPM: watteco-move_o_lite](https://www.npmjs.com/package/watteco-move_o_lite)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **illuminance (CID: 0x0400)** : illuminance (lx)
- **occupancy (CID: 0x0406)** : occupancy
- **pressure (CID: 0x0403)** : pressure (hPa)
- **relative humidity (CID: 0x0405)** : humidity (%RH)
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>PRESS'O [1.1.4]</summary>

  [NPM: watteco-press_o](https://www.npmjs.com/package/watteco-press_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : main_or_external_voltage (V), disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **analog input (CID: 0x000C)** : 4-20_mA (mA), 0-10_V (V)
- **binary input (CID: 0x000F)** : index, pin_state, polarity, edge_selection, debounce_period (ms), poll_period (ms), force_notify

</details>

<details>
<summary>PULSE_SENS'O [1.1.4]</summary>

  [NPM: watteco-pulse_sens_o](https://www.npmjs.com/package/watteco-pulse_sens_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index_1, index_2, index_3, pin_state_1, pin_state_2, pin_state_3, polarity, edge_selection, debounce_period (ms), poll_period (ms), force_notify
- **multi binary inputs (CID: 0x8005)** : pin_state_1, pin_state_2, pin_state_3

</details>

<details>
<summary>PULSE_SENS'O_ATEX [1.1.4]</summary>

  [NPM: watteco-pulse_sens_o_atex](https://www.npmjs.com/package/watteco-pulse_sens_o_atex)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index_1, index_2, index_3, pin_state_1, pin_state_2, pin_state_3, polarity, edge_selection, debounce_period (ms), poll_period (ms), force_notify
- **multi binary inputs (CID: 0x8005)** : pin_state_1, pin_state_2, pin_state_3

</details>

<details>
<summary>SMARTPILOT_WIRE [1.1.5]</summary>

  [NPM: watteco-smartpilot_wire](https://www.npmjs.com/package/watteco-smartpilot_wire)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : main_or_external_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **multi state output (CID: 0x0013)** : output_value

</details>

<details>
<summary>SMARTPLUG [1.1.4]</summary>

  [NPM: watteco-smartplug](https://www.npmjs.com/package/watteco-smartplug)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : main_or_external_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **ON/OFF (CID: 0x0006)** : output
- **power quality (CID: 0x8052)** : frequency (Hz), frequency_min (Hz), frequency_max (Hz), Vrms (V), Vrms_min (V), Vrms_max (V), Vpeak (V), Vpeak_min (V), Vpeak_max (V), over_voltage, sag_voltage
- **simple metering like (CID: 0x0052)** : active_energy (Wh), reactive_energy (VArh), nb_samples, active_power (W), reactive_power (VAr)

</details>

<details>
<summary>TEMP'O [1.1.4]</summary>

  [NPM: watteco-temp_o](https://www.npmjs.com/package/watteco-temp_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>TEMP'O_OUTDOOR [1.1.4]</summary>

  [NPM: watteco-temp_o_outdoor](https://www.npmjs.com/package/watteco-temp_o_outdoor)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>TEMP'O_REMOTE_1_PROBE [1.1.4]</summary>

  [NPM: watteco-temp_o_remote_1_probe](https://www.npmjs.com/package/watteco-temp_o_remote_1_probe)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>TEMP'O_REMOTE_2_PROBES [1.1.4]</summary>

  [NPM: watteco-temp_o_remote_2_probes](https://www.npmjs.com/package/watteco-temp_o_remote_2_probes)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **temperature (CID: 0x0402)** : temperature_1 (Cel), temperature_2 (Cel)

</details>

<details>
<summary>TH [1.1.4]</summary>

  [NPM: watteco-th](https://www.npmjs.com/package/watteco-th)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index
- **relative humidity (CID: 0x0405)** : humidity (%RH)
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>

<details>
<summary>TICS'O [1.1.5]</summary>

  [NPM: watteco-tics_o](https://www.npmjs.com/package/watteco-tics_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : main_or_external_voltage (V), tic_harvesting_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **simple metering like (CID: 0x0052)** : active_energy (Wh), reactive_energy (VArh), nb_samples, active_power (W), reactive_power (VAr)
- **TIC-CBE (CID: 0x0054)** : TIC-CBE_fields (https://support.watteco.com/wp-content/uploads/2020/04/TIC_Application_Layer_Description_1.2.pdf)
- **TIC-CJE (CID: 0x0055)** : TIC-CJE_fields (https://support.watteco.com/wp-content/uploads/2020/04/TIC_Application_Layer_Description_1.2.pdf)
- **TIC-ICE (CID: 0x0053)** : TIC-ICE_fields (https://support.watteco.com/wp-content/uploads/2020/04/TIC_Application_Layer_Description_1.2.pdf)
- **TIC-PMEPMI (CID: 0x0057)** : TIC-PMEPMI_fields (https://support.watteco.com/wp-content/uploads/2020/04/TIC_Application_Layer_Description_1.2.pdf)
- **TIC-STD (CID: 0x0056)** : TIC-STD_fields (https://support.watteco.com/wp-content/uploads/2020/04/TIC_Application_Layer_Description_1.2.pdf)

</details>

<details>
<summary>TORAN'O_ATEX [1.1.4]</summary>

  [NPM: watteco-toran_o_atex](https://www.npmjs.com/package/watteco-toran_o_atex)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **analog input (CID: 0x000C)** : 4-20_mA (mA), 0-5_V_1 (V), 0-5_V_2 (V), ratiometric_0-5_V_1 (V), ratiometric_0-5_V_2 (V)
- **binary input (CID: 0x000F)** : index_1, index_2, index_3, pin_state_1, pin_state_2, pin_state_3
- **multi binary inputs (CID: 0x8005)** : pin_state_1, pin_state_2, pin_state_3

</details>

<details>
<summary>TRIPHAS'O [1.1.4]</summary>

  [NPM: watteco-triphas_o](https://www.npmjs.com/package/watteco-triphas_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : main_or_external_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index
- **energy and power metering (CID: 0x800A)** : positive_active_energy_a (Wh), positive_active_energy_b (Wh), positive_active_energy_c (Wh), positive_active_energy_abc (Wh), negative_active_energy_a (Wh), negative_active_energy_b (Wh), negative_active_energy_c (Wh), negative_active_energy_abc (Wh), positive_reactive_energy_a (VArh), positive_reactive_energy_b (VArh), positive_reactive_energy_c (VArh), positive_reactive_energy_abc (VArh), negative_reactive_energy_a (VArh), negative_reactive_energy_b (VArh), negative_reactive_energy_c (VArh), negative_reactive_energy_abc (VArh), positive_active_power_a (W), positive_active_power_b (W), positive_active_power_c (W), positive_active_power_abc (W), negative_active_power_a (W), negative_active_power_b (W), negative_active_power_c (W), negative_active_power_abc (W), positive_reactive_power_a (VAr), positive_reactive_power_b (VAr), positive_reactive_power_c (VAr), positive_reactive_power_abc (VAr), negative_reactive_power_a (VAr), negative_reactive_power_b (VAr), negative_reactive_power_c (VAr), negative_reactive_power_abc (VAr)
- **energy and power multi metering (CID: 0x8010)** : active_energy_a (Wh), reactive_energy_a (VArh), active_energy_b (Wh), reactive_energy_b (VArh), active_energy_c (Wh), reactive_energy_c (VArh), active_energy_abc (Wh), reactive_energy_abc (VArh), active_power_a (W), reactive_power_a (VAr), active_power_b (W), reactive_power_b (VAr), active_power_c (W), reactive_power_c (VAr), active_power_abc (W), reactive_power_abc (VAr)
- **ON/OFF (CID: 0x0006)** : output
- **voltage and current metering (CID: 0x800B)** : Vrms_a (V), Vrms_b (V), Vrms_c (V), Irms_a (A), Irms_b (A), Irms_c (A), angle_a (deg), angle_b (deg), angle_c (deg)
- **voltage and current multi metering (CID: 0x800D)** : Vrms_a (V), Vrms_b (V), Vrms_c (V), Irms_a (A), Irms_b (A), Irms_c (A), angle_a (deg), angle_b (deg), angle_c (deg)

</details>

<details>
<summary>VAQA'O_LITE [1.1.4]</summary>

  [NPM: watteco-vaqa_o_lite](https://www.npmjs.com/package/watteco-vaqa_o_lite)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : disposable_battery_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : violation_detection
- **concentration (CID: 0x800C)** : IAQ, CO2 (ppm)
- **illuminance (CID: 0x0400)** : illuminance (lx)
- **occupancy (CID: 0x0406)** : occupancy
- **pressure (CID: 0x0403)** : pressure (hPa)
- **relative humidity (CID: 0x0405)** : humidity_1 (%RH), humidity_2 (%RH)
- **temperature (CID: 0x0402)** : temperature_1 (Cel), temperature_2 (Cel)

</details>

<details>
<summary>VENTIL'O [1.1.4]</summary>

  [NPM: watteco-ventil_o](https://www.npmjs.com/package/watteco-ventil_o)
- **basic (CID: 0x0000)** : kernel, manufacturer, model, date, position, application_name
- **configuration (CID: 0x0050)** : main_or_external_voltage (V), solar_harvesting_voltage (V)
- **lorawan (CID: 0x8004)** : message_type, nb_retry, automatic_association, data_rate, ABP_dev_address, OTA_app_EUI
- **binary input (CID: 0x000F)** : index, pin_state
- **differential pressure (CID: 0x8008)** : differential_pressure (Pa)
- **temperature (CID: 0x0402)** : temperature (Cel)

</details>


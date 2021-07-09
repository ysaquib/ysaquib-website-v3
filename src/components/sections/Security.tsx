/**
 * File: Security.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import Section from '../elements/Section';
import {ExpandMore, ExpandLess} from '@material-ui/icons/';

import default_data from '../../default_data.json';

import public_key_file from "../../documents/public_pgp_key.asc";

const Security : FC = () =>
{
    /**
     * Use a state to tell if the Key Drawer is hidden or shown
     * UseEffect to add and remove shown class from div
     */

    const [showKey, setShowKey] = useState(false);
    const [PGPKey, setPGPKey] = useState("Loading...");

    
    useEffect(() => {
        fetch(public_key_file).then((res) => res.text()).then((text) => setPGPKey(text));
    }, []);

    useEffect(() => {
        if (showKey)
        {
            return document.getElementById("public_key")?.classList.add("shown");
        }
        else
        {
            return document.getElementById("public_key")?.classList.remove("shown");
        }
    }, [showKey])

    /**
     * There's probably a much better way to put the key details here but I 
     * don't know of any that work other than this.
     */

    return (
        <Section id="security" title={default_data.security.title}>
            <div className="security_wrapper">
                <div className="label" onClick={() => setShowKey(!showKey)}>
                    <h2 className="key_toggle">{showKey ? `Hide` : `Show`} Public Key Details</h2>
                    {showKey ? <ExpandLess className="icon"/> : <ExpandMore className="icon"/>}
                </div>
                <div id="public_key" className="public_key">
                    <p className="pgp_key">
                        {PGPKey}
                    </p>
                </div>
            </div>
        </Section>
    );
}

export default Security;
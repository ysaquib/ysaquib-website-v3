/**
 * File: Security.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import Section from '../elements/Section';
import {ExpandMore, ExpandLess} from '@material-ui/icons/';

let default_data = require('../../default_data.json');

const Security : FC = () =>
{

    /**
     * Use a state to tell if the Key Drawer is hidden or shown
     * UseEffect to add and remove shown class from div
     */

    const [showKey, setShowKey] = useState(false);
    
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
                    <h2>{showKey ? `Hide` : `Show`} Public Key Details</h2>
                    {showKey ? <ExpandLess className="icon"/> : <ExpandMore className="icon"/>}
                </div>
                <div id="public_key" className="public_key">
                    <p className="key">
                        User-ID:     Yusuf Saquib &lt;&#x79;&#x75;&#x73;&#x75;&#x66;&#x73;&#x61;&#x71;&#x75;&#x69;&#x62;&#x40;&#x67;&#x6D;&#x61;&#x69;&#x6C;&#x2E;&#x63;&#x6F;&#x6D;&gt; <br />
                        Expires:     2026-06-01 23:59:00                                    <br />
                        Type:        4096-bit RSA                                           <br />
                        Usage:       SCEA                                                   <br />
                        Fingerprint: 69AD 923D 0F1A 62FC 8735 2D2E 1764 8468 1C4A D930      <br />
                                                                                            <br />
                        -----BEGIN PGP PUBLIC KEY BLOCK-----                                <br />
                        mQINBGC2q/oBEADp+7qm9N82ECH7WmHqL3BZOl5BNLKzHUl+2JEUR/WUkk+DJ5hW    <br />
                        0qj5h7ChSNmXNfeopeheVZrPZwu/UdNq+JTuO6bMNndGcaBujrBfimuJVWA+XuAm    <br />
                        9zvq+aLc4Zs6Fhh4Y5RP/tsnWJqo8DtMTfV/xL3ZH03lsDtTAsUOT8k3yQkc/UI0    <br />
                        79cDURmS364yW01S+9QZShL+UqgiwJeWAGKaVmYaQcrmH0cE2vFV5Z0+2zWlh33T    <br />
                        VnGyKiUZDf/f7f0phs+tz6PLb4bx8kaYyxIRkIKgIDlRi/B4VJ4Erq28ZW8lCpkB    <br />
                        q5NG8rnk119Oy/pa1J1DhDcBFxGzcOP6+8d+/BnRq4LHQuHqksdMvKPTQ18Z+rzc    <br />
                        pAMHvzyb15vmbGQLJEdJ7nOKi45yIFxTt9Sda71/3wiHB38EzPruMQ+ebKmw3inj    <br />
                        YdebgVG09f5dlSGFmEJ2yXtxDw9oYAuE5XHvsYMtbczgh9SotFKVDTsufaNBMkTO    <br />
                        u0bH5F7bU4kI/ia1rQX2iD6veRwoZ+gwFeCvBFVmsvO+OnrB7UInrb8hIww6ect6    <br />
                        NWF3ebENQrady0CPVA+8gzmHhC3ZmXwITAN7Bbkw4+bLF+su5uqXE5uMSq/Ngcaz    <br />
                        9aLRezExMP3C0rgyIPpjQLun7FA/Ggh/mkvRQKHZE48FWoLzuxDrdzR66wARAQAB    <br />
                        tCRZdXN1ZiBTYXF1aWIgPHl1c3Vmc2FxdWliQGdtYWlsLmNvbT6JAlQEEwEIAD4W    <br />
                        IQRprZI9Dxpi/Ic1LS4XZIRoHErZMAUCYLar+gIbIwUJA8IUhgULCQgHAgYVCgkI    <br />
                        CwIEFgIDAQIeAQIXgAAKCRAXZIRoHErZMD6JEACzhk91lTSJVDeDU/Gdz3TZim0T    <br />
                        t7+OJTxnEY714ZPyHjgsX8KPSrBa5m+ivGcHZrywEPhZHx/6pL2SbgVsFpYw+0AN    <br />
                        kvYj06NksQsx4ub4LkVhhKRBkMBVkY18r/+TcoX755nzqjSn6lVZzZjpW4aFC2gJ    <br />
                        e7DpsRBoUuwID8P9mL1mplbSaL5N7E7nqmi8kbKlCr4FS1aBAhXOFSip6FiU3+u3    <br />
                        TALBxpEGbaPV/r0J9OpqfyOxg0zp/2aPakHOfIzwDqcphoy+tBqwSJFXBi3YQchT    <br />
                        wbRoPmFiCEYEr17ISD6IqqBz5hgpmbxIs928etlrP2GJpOrpM5ZcE00E40sXuqHo    <br />
                        mpNwlr2e4mrXEpDFmVOxA+3xKlkk0tq2QhH7H992Ox9E0ndsvo1gTFmITichiwpl    <br />
                        vsC1XakcJLRWTwnQNdT4QGGZ0BvwLvo0by1kvr/L6JSQ3ObS8jKlPd/8r3UNqHFO    <br />
                        Mi0zCNia23Kcqo1i1Pj+uopP0pefyJS/NV76LrFZ6sOOv7qdB7Xrm06olC1idoGS    <br />
                        Y5RuMx1dMvjRg+5gHDQ4nFsHc11OlL8oRNYKnrPRe5BP2cTFOHa2YDbRIyRypBWM    <br />
                        tdv7iwf4iKqnwCyb7Ao49kxuveArdys8LMu1gX8971l8P78PqVquuWl9lROUH63s    <br />
                        wGgeqTnBNlSLx68C8LkCDQRgtqv6ARAAy8IgyznkguH0TPjUJQaZyqjIKoJhOTOA    <br />
                        b34qt8itwT01Hh0vQ6gz1OydIe4H8xPyMfBj/IUs3+cqTdFKoM6Etv0PEc9BqcRg    <br />
                        0l/Lomn7ZnLlyb+SunaC1iti0q0ak52hvfFP3YRIqfVXRcLBxr3PfcLVAIzi7VV4    <br />
                        NTOk5ptL4Uz86iNmWDMFX0/p4crSMHllMM41R89Is+HDTtdCLbMIGNCbgwtLtixf    <br />
                        wR6R/2Ho7cnz6s3czNU0i8AHZPk5kt6tsM8opxa6j0/VGFIW5ewQvHoOa5IlzBrx    <br />
                        A4MIM5xIGfqEnbIt14dfiB2uJ2M1yDdU3xL5FE5ERYVXFPkMp4Y+VG9n7EBChnE9    <br />
                        Yu1VH1wv6k8tpsUDPwC6JVK0GpRABm49hZI73/AgGLlfd1UGYDPW6tMFwrv5Rjnr    <br />
                        /jh54yhL+97VzzqTiRG3D6y8NZZiMy4/cKuCsoaHxwUcQI+9/MSQzf9GdrXywXnF    <br />
                        1jyoukwP3gjYdzXI0Bq6CSMUhtr7yIE8vkAvehb7RD+V28kx2GtQ04QLTVnewA/w    <br />
                        McuyXitNPz3CYpIVul4uykm/DPHY40SUOlTy8bTRV6maOWo5ad3qh+dexivFbuc1    <br />
                        /oPe2jwLByav2lB8/a+C8z8tJ/DcuAa7pFtlqY6DNl/zr6Sm+u8yJIPkA0/AIFOH    <br />
                        9hLvBCOjaVEAEQEAAYkCPAQYAQgAJhYhBGmtkj0PGmL8hzUtLhdkhGgcStkwBQJg    <br />
                        tqv6AhsMBQkDwhSGAAoJEBdkhGgcStkwBroP/3epHWllwshqtKHbEf1d52qJTc5j    <br />
                        k/B2g8jxh8ORu6tntJ6xrYDr6r4sk4PttzSHZHo5dcsqrk2t0mUIUfD11JvIeblt    <br />
                        EGf6uympB7Tw2E4IuVJki62Qds4pvGkd+DMAZ9Tvgpo/D9BB6tS92sZKNqmzWI2W    <br />
                        FRCcLEJIuGCXxy6w8jjPj50A+6LsihVJ6CVDDxREeCwpe9iaGS+upvL/D9+6zg4P    <br />
                        HFLeVW3CuUsMfUAiWNEElk/YlTQc2uigolWH8GUDTX0K9QjALxY36LIfBbtsStnh    <br />
                        KkrM0vmYek1s4iErlz4qLHEq8JGNllMWuQvGsqdJeFSIam4qJ+0Xhmx1zsr/poVa    <br />
                        oPsN2GE8IEZYT5qiJWLAG8VFyEbfVPDozMxLKjAL1TJ98CiFfrjxs/aZQD9X5XjK    <br />
                        is31CKFkmQv7VrAwHcM8A/n8xGk5w68gqY8Tw9C8/j6jePOPvJpXSm9ldvkP+7qF    <br />
                        H0ixPi8VLJDk5WMFqqLESrQdX0NsG55GSjz77klO5thmPC704+iWPb8k1Xld+lJG    <br />
                        l3zNioLCiNpp4KEF3W5oQQ5bEFEaThUFMrT8FvL80G+wBNw63kyYfd3w/HU8khcZ    <br />
                        JvnsOoau/O2J2kWd8fliMrZC8PU7MBm3ZrgI2Ld96867h9a8AejYQWYs8AlMuiBQ    <br />
                        2YJRykc7Kb8DkgAE                                                    <br />
                        =Yi1u                                                               <br />
                        -----END PGP PUBLIC KEY BLOCK-----                                  <br />
                    </p>
                </div>
            </div>
        </Section>
    );
}

export default Security;
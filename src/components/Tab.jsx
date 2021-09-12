import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import './tab.css';

const Tab = () => {

    const [desc, setDesc] = useState("New Tab 1")
    const [active, setActive] = useState(1);
    const [idx, setIdx] = useState(2)
    const [tab, setTab] = useState([
        {
            TabId : 1,
            TabName: `New Tab ${1}`
        },
    ])

    const addTab = () => {
        setTab(oldItems => [ ...oldItems, {
            TabId: idx,
            TabName: `New Tab ${idx}`
        }])
        setActive(idx)
        setDesc(`New Tab ${idx}`)
        setIdx(idx+1)
    }
    
    const removeTab = (id) => {
        setTab(tab.filter(item => item.TabId !== id));
    }
    
    useEffect(() => {
        setDesc(`New Tab ${tab.reduce((acc, item) => acc = acc>item.TabId ? acc:item.TabId, 0)}`);
        setActive(tab.reduce((acc, item) => acc = acc>item.TabId ? acc:item.TabId, 0));
    }, [tab])


    return (
        <div>
            <div className="container">
                <div className="wrapper">
                    <div className="tab-title">
                        <ReactSortable list={tab} setList={setTab} className="tab-ul">
                            {tab.map((item) => (
                                <div className='tab' key={item.TabId}>
                                    <li
                                        onClick={() => {
                                            setDesc(item.TabName)
                                            setActive(item.TabId)
                                        }}
                                        className={`tab-name ${(item.TabId === active) ? "active" : ""}`}
                                    >
                                            <p>{item.TabName}</p>
                                            
                                    </li>
                                    <span className='removeIcon' onClick={() => removeTab(item.TabId)}>
                                        <p style={{fontSize:'14px', cursor:'pointer'}}>x</p>    
                                    </span> 
                                </div>
                            ))}
                        </ReactSortable>
                        <div
                            onClick={() => addTab()} 
                            className="plus-icon" 
                            title='click to add a new tab'
                        >
                            <p>+</p>
                        </div>
                    </div>

                    <div className="tab-element">
                        <h1>{desc}</h1>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tab


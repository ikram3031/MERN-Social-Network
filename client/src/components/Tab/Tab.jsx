import { useState } from 'react';
import './Tab.scss'

const Tab = (props) => {
    const [activeTab, setActiveTab] = useState(1);

    const { description } = props;

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    }

    return (
        <div className="tab">
            <div className="tab-header">
                <div className={`tab-item ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                    Description
                </div>
                <div className={`tab-item ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
                    Reviews
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 1 && <p>{description}</p>}
                {activeTab === 2 && <p>Content for Tab 2</p>}
            </div>
        </div>
    )
}

export default Tab
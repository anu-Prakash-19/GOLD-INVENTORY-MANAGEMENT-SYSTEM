import React, { useEffect, useState } from 'react';
import { database } from "../../firebase";
import { ref, update, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import './Reports.css';

function Reports() {
    const [tdata, setTData] = useState([]);
    const [sortOption, setSortOption] = useState('date');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    const sortData = (data) => {
        switch (sortOption) {
            case 'date':
                return [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            case 'priceHigh':
                return [...data].sort((a, b) => b.price - a.price);
            case 'priceLow':
                return [...data].sort((a, b) => a.price - b.price);
            case 'quantityHigh':
                return [...data].sort((a, b) => b.quantity - a.quantity);
            case 'quantityLow':
                return [...data].sort((a, b) => a.quantity - b.quantity);
            default:
                return data;
        }
    }

    const filterDataByDate = (data) => {
        if (!startDate && !endDate) return data;

        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();

        return data.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= start && itemDate <= end;
        });
    }

    const handleRedirect = (id, supplierName) => {
        navigate(`/dashboard/invoicePage/${id}/${supplierName}`);
    };

    const handleClearClick = (itemId) => {
        if (window.confirm("Are you sure you want to update the payment?")) {
            const itemRef = ref(database, `Admin/Transaction/${itemId}`);
            update(itemRef, { paymentType: 'full' })
                .then(() => {
                    console.log('Payment type updated successfully');
                    setTData(prevData =>
                        prevData.map(item =>
                            item.id === itemId ? { ...item, paymentType: 'full' } : item
                        )
                    );
                })
                .catch(error => {
                    console.error('Error updating payment type:', error);
                });
        }
    };

    useEffect(() => {
        const tRef = ref(database, "Admin/Transaction");
        onValue(tRef, (snapshot) => {
            const tsData = snapshot.val();
            if (tsData) {
                const tList = Object.keys(tsData).map((tId) => ({
                    id: tId,
                    ...tsData[tId]
                }));
                setTData(tList);
            } else {
                setTData([]);
            }
        });
    }, []);

    const sortedData = sortData(filterDataByDate(tdata));

    return (
        <div className="reports-container">
            <div className="reports-card">
                <div className="reports-content">
                    <div className="filter-controls">
                        <div className="mb-3">
                            <label htmlFor="sortOptions" className="form-label">Sort by: </label>
                            <select 
                                id="sortOptions" 
                                className="form-select" 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="date">Date (latest)</option>
                                <option value="priceHigh">Price (high to low)</option>
                                <option value="priceLow">Price (low to high)</option>
                                <option value="quantityHigh">Quantity (high to low)</option>
                                <option value="quantityLow">Quantity (low to high)</option>
                            </select>
                        </div>

                        <div className="date-filters">
                            <div className="date-filter">
                                <label htmlFor="startDate" className="form-label">Start Date: </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="date-filter">
                                <label htmlFor="endDate" className="form-label">End Date: </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="reports-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Product Name</th>
                                    <th>Timestamp</th>
                                    <th>Due Payment</th>
                                    <th>Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.timestamp}</td>
                                        <td>
                                            {item.paymentType === 'advance' && (
                                                <button
                                                    className="btn btn-clear"
                                                    onClick={() => handleClearClick(item.id)}
                                                >
                                                    Clear
                                                </button>
                                            )}
                                            {item.paymentType === 'full' && <span>N/A</span>}
                                        </td>
                                        <td>
                                            {item.paymentType === 'full' && item.supplierName !== "NaN" && (
                                                <button 
                                                    className="btn btn-download"
                                                    onClick={() => handleRedirect(item.id, item.supplierName)}
                                                >
                                                    Download Invoice
                                                </button>
                                            )}
                                            {(item.paymentType === 'advance' || item.supplierName === "NaN") && (
                                                <span>N/A</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;
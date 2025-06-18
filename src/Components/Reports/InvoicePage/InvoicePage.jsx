// InvoicePage.js
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { database } from "../../../firebase";
import { ref,onValue } from "firebase/database";
import './InvoicePage.css'; // Import the CSS file

const InvoicePage = () => {
    const { id } = useParams();
    const { supplierName } = useParams();

    const [companyInfo, setCompanyInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        website: ''
    });

    const [transactionInfo, setTransactionInfo] = useState({
        id: '',
        paymentType: '',
        price: '',
        productName: '',
        quantity: '',
        rate: '',
        suppliername: '',
        tax: '',
        timestamp: '',
    });

    const [clientInfo, setClientInfo] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Address: '',
        City: '',
        State: '',
        Zipcode: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const starCountRef = ref(database, 'Admin/CompanyDetails');
            onValue(starCountRef, (snapshot) => {
                setCompanyInfo({
                    name: snapshot.child('cname').val(),
                    email: snapshot.child('cemail').val(),
                    phone: snapshot.child('cphone').val(),
                    address: snapshot.child('caddress').val(),
                    description: snapshot.child('cdescription').val(),
                    website: snapshot.child('cwebsite').val(),
                });
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const starCountRef = ref(database, `Admin/Transaction/${id}`);
            onValue(starCountRef, (snapshot) => {
                setTransactionInfo({
                    id: { id },
                    paymentType: snapshot.child('paymentType').val(),
                    price: snapshot.child('price').val(),
                    productName: snapshot.child('productName').val(),
                    quantity: snapshot.child('quantity').val(),
                    rate: snapshot.child('rate').val(),
                    suppliername: snapshot.child('supplierName').val(),
                    tax: snapshot.child('tax').val(),
                    timestamp: snapshot.child('timestamp').val(),
                });
            });
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            let path = 'Admin';

            if (id.includes("SO")) {
                path += `/Consumer/${supplierName}`;
            } else if (id.includes("SI")) {
                path += `/Supplier/${supplierName}`;
            }

            const starCountRef = ref(database, path);
            onValue(starCountRef, (snapshot) => {
                setClientInfo({
                    Name: snapshot.child('Name').val(),
                    Email: snapshot.child('Email').val(),
                    Phone: snapshot.child('Phone').val(),
                    Address: snapshot.child('Address').val(),
                    City: snapshot.child('City').val(),
                    State: snapshot.child('State').val(),
                    Zipcode: snapshot.child('Zipcode').val()
                });
            });
        };
        fetchData();
    }, [id, supplierName]);

    const handlePrintInvoice = () => {
        window.print();
    };

    return (
        <div className="invoice-container">
            <div className="invoice-card">
                <div className="invoice-header">
                    <h4>Invoice</h4>
                </div>
                <div className="invoice-body">
                    <div className="invoice-address-section">
                        <div className="invoice-from">
                            <h5>From:</h5>
                            <address>
                                <strong>{companyInfo.name}</strong><br />
                                {companyInfo.address}<br />
                                Email: {companyInfo.email}<br />
                                Phone: {companyInfo.phone}<br />
                                Website: {companyInfo.website}<br />
                                {companyInfo.description && `Description: ${companyInfo.description}`}
                            </address>
                        </div>
                        <div className="invoice-to">
                            <h5>To:</h5>
                            <address>
                                <strong>{supplierName}</strong><br />
                                {clientInfo.Address}<br />
                                {clientInfo.City && `${clientInfo.City}, `}
                                {clientInfo.State && `${clientInfo.State}, `}
                                {clientInfo.Zipcode}<br />
                                {clientInfo.Email && `Email: ${clientInfo.Email}`}<br />
                                {clientInfo.Phone && `Phone: ${clientInfo.Phone}`}
                            </address>
                        </div>
                    </div>

                    <div className="invoice-details-section">
                        <div className="invoice-number">
                            <h5>Invoice Number: {id}</h5>
                            <h5>Invoice Date: {transactionInfo.timestamp}</h5>
                        </div>
                    </div>

                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">1</td>
                                <td>{transactionInfo.productName}</td>
                                <td>{transactionInfo.quantity}</td>
                                <td>{transactionInfo.price}/- INR</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="3" className="text-right">Total</th>
                                <th>{transactionInfo.price}/- INR</th>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="invoice-actions">
                        <button className="print-button" onClick={handlePrintInvoice}>
                            Print Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
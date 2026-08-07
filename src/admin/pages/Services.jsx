import { useEffect, useState } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import AdminLayout from "../components/AdminLayout";
import ServiceForm from "../components/services/ServiceForm";
import ServiceTable from "../components/services/ServiceTable";

function Services() {

    const [services, setServices] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editData, setEditData] = useState(null);

    const loadServices = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/services`
            );

            setServices(response.data);

        }
        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadServices();

    }, []);

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    🛕 Temple Services
                </h2>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setEditData(null);

                        setShowForm(true);

                    }}
                >
                    + Add Service
                </button>

            </div>

            {

                showForm && (

                    <ServiceForm

                        editData={editData}

                        loadServices={loadServices}

                        closeForm={() => {

                            setShowForm(false);

                            setEditData(null);

                        }}

                    />

                )

            }

            <ServiceTable

                data={services}

                loadServices={loadServices}

                editRow={(row) => {

                    setEditData(row);

                    setShowForm(true);

                }}

            />

        </AdminLayout>

    );

}

export default Services;
import { useEffect, useState } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import AdminLayout from "../components/AdminLayout";
import AartiForm from "../components/aarti/AartiForm";
import AartiTable from "../components/aarti/AartiTable";

function Aarti() {

    const [aartiList, setAartiList] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editData, setEditData] = useState(null);

    const loadAarti = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/aarti`
            );

            setAartiList(response.data);

        }
        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadAarti();

    }, []);

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-4">

                <h2>
                    🪔 Daily Aarti
                </h2>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setEditData(null);

                        setShowForm(true);

                    }}
                >
                    + Add Aarti
                </button>

            </div>

            {

                showForm && (

                    <AartiForm

                        editData={editData}

                        loadAarti={loadAarti}

                        closeForm={() => {

                            setShowForm(false);

                            setEditData(null);

                        }}

                    />

                )

            }

            <AartiTable

                data={aartiList}

                loadAarti={loadAarti}

                editRow={(row) => {

                    setEditData(row);

                    setShowForm(true);

                }}

            />

        </AdminLayout>

    );

}

export default Aarti;
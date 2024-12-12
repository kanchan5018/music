import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createplaylistRequest,
  deletePlaylistRequest,
  getallRequest,
  updateRequest,
} from "../redux/playList/action";
import { ToastContainer } from "react-toastify";
import './DashBoard.css';

const DashBoard = () => {
  const dispatch = useDispatch();
  const { logindata } = useSelector((state) => state.User);
  const playlists = useSelector((state) => state.Playlist?.playlists || []);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
  const [editPlaylist, setEditPlaylist] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    const id = logindata?.data?.id;
    dispatch(getallRequest({ userId: id }));
  }, [dispatch, logindata]);

  const handleViewPlaylist = (playlist) => {
    navigate(`/search/${playlist._id}`);
  };

  const validateFields = (fields) => {
    const { name, description } = fields;
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Playlist name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleCreatePlaylist = () => {
    const newErrors = validateFields(newPlaylist);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(createplaylistRequest({ ...newPlaylist }));
    setNewPlaylist({ name: "", description: "" });
    setErrors({});
    setShowModal(false); // Close modal after successful creation
  };

  const handleUpdatePlaylist = () => {
    const newErrors = validateFields(editPlaylist);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(updateRequest({ ...editPlaylist, id: selectedPlaylist._id }));
    setEditPlaylist({ name: "", description: "" });
    setShowModal(false); // Close modal after successful update
  };

  const handleDeletePlaylist = (playlistId) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      dispatch(deletePlaylistRequest(playlistId));
    }
  };

  const columns = [
    { name: "Playlist Name", selector: (row) => row.name, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button className="btn btn-info-view" onClick={() => handleViewPlaylist(row)}>
            View
          </button>
          <button
            className="btn btn-warning-update ms-2"
            onClick={() => {
              setSelectedPlaylist(row);
              setEditPlaylist({ name: row.name, description: row.description });
              setErrors({});
              setShowModal(true);
            }}
          >
            Edit
          </button>
          <button className="btn btn-danger-delete ms-2" onClick={() => handleDeletePlaylist(row._id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper toggled">
      <main className="content-wrapper">
        <ToastContainer />
        <div className="header-bar d-flex justify-content-between mb-3">
          <h5 className="mb-0 text-dark">Playlists</h5>
          <button
            className="btn btn-sm btn-gradient-primary"
            onClick={() => {
              setSelectedPlaylist(null);
              setNewPlaylist({ name: "", description: "" });
              setErrors({});
              setShowModal(true);
            }}
          >
            Add Playlist
          </button>
        </div>
        <div className="container-fluid">
          <DataTable
            title="All Playlists"
            columns={columns}
            data={playlists}
            pagination
            highlightOnHover
            pointerOnHover
          />
          {showModal && (
            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {selectedPlaylist ? "Edit Playlist" : "Add New Playlist"}
                    </h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">
                        Playlist Name {selectedPlaylist ? null : <span className="text-danger">*</span>}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        value={selectedPlaylist ? editPlaylist.name : newPlaylist.name}
                        onChange={(e) =>
                          selectedPlaylist
                            ? setEditPlaylist({ ...editPlaylist, name: e.target.value })
                            : setNewPlaylist({ ...newPlaylist, name: e.target.value })
                        }
                        placeholder="Enter playlist name"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Description {selectedPlaylist ? null : <span className="text-danger">*</span>}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        value={selectedPlaylist ? editPlaylist.description : newPlaylist.description}
                        onChange={(e) =>
                          selectedPlaylist
                            ? setEditPlaylist({ ...editPlaylist, description: e.target.value })
                            : setNewPlaylist({ ...newPlaylist, description: e.target.value })
                        }
                        placeholder="Enter playlist description"
                      />
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={selectedPlaylist ? handleUpdatePlaylist : handleCreatePlaylist}
                    >
                      {selectedPlaylist ? "Save Changes" : "Save Playlist"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashBoard;

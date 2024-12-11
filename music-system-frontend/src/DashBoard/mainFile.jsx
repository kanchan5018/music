import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createplaylistRequest,
  deletePlaylistRequest,
  getallRequest,
  updateRequest,
} from "../redux/playList/action";
import './DashBoard.css'

const DashBoard = () => {
  const dispatch = useDispatch();
  const { logindata } = useSelector((state) => state.User);
  const playlists = useSelector((state) => state.Playlist?.playlists || []);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
  const [editPlaylist, setEditPlaylist] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const id = logindata?.data?.id;
    dispatch(getallRequest({ userId: id }));
  }, [dispatch, logindata]);

  const handleViewPlaylist = (playlist) => {
    navigate(`/search/${playlist._id}`);
  };

  const handleCreatePlaylist = () => {
    dispatch(createplaylistRequest({ ...newPlaylist }));
    setNewPlaylist({ name: "", description: "" });
  };

  const handleUpdatePlaylist = () => {
    if (selectedPlaylist) {
      dispatch(
        updateRequest({
          ...editPlaylist,
          id: selectedPlaylist._id,
        })
      );
      setEditPlaylist({ name: "", description: "" });
    }
  };

  const handleDeletePlaylist = (playlistId) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      dispatch(deletePlaylistRequest(playlistId));
    }
  };

  const columns = [
    {
      name: "Playlist Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button className="btn btn-info-view" onClick={() => handleViewPlaylist(row)}>
            View
          </button>
          <button
            className="btn btn-warning-update ms-2"
            data-bs-toggle="modal"
            data-bs-target="#playlistModal"
            onClick={() => {
              setSelectedPlaylist(row);
              setEditPlaylist({ name: row.name, description: row.description });
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
      {/* <Sidebar /> */}
      <main className="content-wrapper">
      <div className="header-bar d-flex justify-content-between mb-3">
            <h5 className="mb-0 text-dark">Playlists</h5>
            <button
              className="btn btn-sm btn-gradient-primary"
              data-bs-toggle="modal"
              data-bs-target="#playlistModal"
              onClick={() => {
                setSelectedPlaylist(null);
                setNewPlaylist({ name: "", description: "" });
              }}
            >
              Add Playlist
            </button>
          </div>
        <div className="container-fluid">
          <div className="layout-specing">
            <DataTable
              title="All Playlists"
              columns={columns}
              data={playlists}
              pagination
              highlightOnHover
              pointerOnHover
            />

            {/* Bootstrap Modal */}
            <div className="modal fade" id="playlistModal" tabIndex="-1" aria-labelledby="playlistModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="playlistModalLabel">
                      {selectedPlaylist ? "Edit Playlist" : "Add New Playlist"}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Playlist Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedPlaylist ? editPlaylist.name : newPlaylist.name}
                        onChange={(e) =>
                          selectedPlaylist
                            ? setEditPlaylist({ ...editPlaylist, name: e.target.value })
                            : setNewPlaylist({ ...newPlaylist, name: e.target.value })
                        }
                        placeholder="Enter playlist name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedPlaylist ? editPlaylist.description : newPlaylist.description}
                        onChange={(e) =>
                          selectedPlaylist
                            ? setEditPlaylist({ ...editPlaylist, description: e.target.value })
                            : setNewPlaylist({ ...newPlaylist, description: e.target.value })
                        }
                        placeholder="Enter playlist description"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={selectedPlaylist ? handleUpdatePlaylist : handleCreatePlaylist}
                    >
                      {selectedPlaylist ? "Save Changes" : "Save Playlist"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;

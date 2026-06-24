import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function ConfigTab() {
    return (
        <div className="container-fluid">
            <h4 className="mb-4"><i className="fa fa-cog"></i> Configurações do Portal</h4>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <Link to="/admin/institucional" style={{ textDecoration: 'none' }}>
                        <Card style={{ cursor: 'pointer' }}>
                            <Card.Body>
                                <Card.Title><i className="fa fa-building"></i> Institucional</Card.Title>
                                <Card.Text>
                                    Alterações da página Institucional do portal
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-4 mb-3">
                    <Link to="/admin/contato" style={{ textDecoration: 'none' }}>
                        <Card style={{ cursor: 'pointer' }}>
                            <Card.Body>
                                <Card.Title><i className="fa fa-phone"></i> Contato</Card.Title>
                                <Card.Text>
                                    Alterações da página Contato
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ConfigTab;

import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const MapaBotones = (props) => {
    let lista = [];
    for (let i = 0; i < 9; i++) {
        let lista2 = [];

        for (let j = 0; j < 9; j++) {
            if (props.listaBotones[i][j] === "-") {
                lista2.push(<Button key={i * 10 + j} outline onClick={() => props.clica(i, j)} />);
            } else {
                lista2.push(<Button key={i * 10 + j} color={props.listaBotones[i][j]} />);
            }
        }

        lista2.push(<br/>);
        lista.push(lista2);
        si
    }
    return lista;
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaBotones: Array(9).fill(null),
            listaColores: ["primary", "danger"],
            titulo: "Azules",
            turno: true,
            jugable: true,
        };
    }

    cambiaPosicion(y) {
        let list = this.state.listaBotones;
        for (let i = 0; i < 9; i++) {

            if (list[i][y] != "-") return i - 1;
        }
        return 8;

    }

    clica(x, y) {
        if (!this.state.jugable) return;

        if (x !== 0) return;
        let list = this.state.listaBotones;
        let p = this.cambiaPosicion(y);

        if (p >= 0) {
            if (this.state.turno) {
                list[p][y] = this.state.listaColores[0]
            } else {
                list[p][y] = this.state.listaColores[1]
            }
        }
        let titulo = "Azules";
        if (this.state.turno) titulo = "Rojos"

        this.setState({ listaBotones: list, turno: !this.state.turno, titulo: titulo })
        this.compruebaGanador();
    }

    compruebaGanador() {
        let list = this.state.listaBotones;
        for (let i = 0; i < 9; i++) {

            for (let j = 0; j < 9 - 3; j++) {

                if (list[i][j] != "-" && list[i][j] == list[i][j + 1] && list[i][j] == list[i][j + 2] &&
                    list[i][j] == list[i][j + 3]) {

                    if (list[i][j] == "primary") {
                        this.setState({ titulo: "Ganan los azules", jugable: false });
                    } else {
                        this.setState({ titulo: "Ganan los rojos", jugable: false });
                    }
                }
            }
        }

        for (let i = 0; i < 9 - 3; i++) {

            for (let j = 0; j < 9; j++) {
                
                if (list[i][j] != "-" && list[i][j] == list[i + 1][j] && list[i][j] == list[i + 2][j] &&
                    list[i][j] == list[i + 3][j]) {

                    if (list[i][j] == "primary") {

                        this.setState({ titulo: "Ganan los azules", jugable: false });
                    } else {
                        this.setState({ titulo: "Ganan los rojos", jugable: false });
                    }
                }
            }
        }
    }

    componentWillMount() {
        let list = this.state.listaBotones;

        for (let i = 0; i < list.length; i++) {

            let x = Array(9).fill("-");
            list[i] = x;
        }
        this.setState({ listaBotones: list })
    }

    render() {
        return (
            <div className="App">
                <h1>4 En raya Alberto Collado Araujo</h1>
                <h1>Turno: {this.state.titulo}</h1>
                
                <MapaBotones
                    listaBotones={this.state.listaBotones}
                    clica={(x, y) => this.clica(x, y)}
                />
                
                { !this.state.jugable && (
                    <Button outline  color="info" onClick={() => window.location.reload(false)}>Volver a Empezar</Button>
                )}
            </div>
        );
    }
}

export default App;
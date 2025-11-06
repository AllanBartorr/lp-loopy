import React, { useState, useEffect } from 'react';

import { Card, CardHeader, CardBody, CardFooter, Row, Col, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label, Input, Button, Collapse } from 'reactstrap';
import DateInput from '../../components/DateInput';
import serverRequest from '../../utils/serverRequest';
import MaterialTable from 'material-table';
import localization from '../../assets/json/mtable-localization.json';
import MultipleSelect from '../../components/MultipleSelect';
import moment from 'moment';
import AlertMessage from '../../utils/alertmessage';

export default function View() {

  const hj = moment(new Date()).format('YYYY-MM-DD');

  const [tabulacoes, setTabulacoes] = useState([]);


  const [filtros, setFiltros] = useState({ dtini: hj, dtfim: hj, hrini: '08:00', hrfim: '21:59', tabulacao: [], telefone: '', documento: '', });

  const [parametrosVisiveis, setParametrosVisiveis] = useState(true);
  const toggleParametrosVisiveis = () => setParametrosVisiveis(!parametrosVisiveis);

  const tableRef = React.createRef();

  const columns = [
    { title: 'ConversationID', field: 'gravacao' },
    { title: 'Data', field: 'data', type: 'date' },
    { title: 'Hora', field: 'hora' },
    { title: 'Duração', field: 'duracao' },
    { title: 'Telefone', field: 'telefone' },
    { title: 'Documento', field: 'documento' },
    { title: 'Tabulação', field: 'ds_tabulacao' },
    { title: 'Gravação', render: rowData => linkGravacao(rowData) }
  ];

function linkGravacao(rowData) {
  if (rowData.gravacao) {
    return (
      <Button onClick={() =>
        baixarGravacao(rowData.gravacao, rowData.project_name, rowData.flag_hoje, rowData)
      }>
        <i className="fa fa-play-circle" />
      </Button>
    );
  } else {
    return "N/D";
  }
}


function baixarGravacao(id, projeto, flag_hoje, rowData) {
  serverRequest.request('/rogue/gravacao', {
    id_atendimento: id,
    project_name: projeto,
    flag_hoje: flag_hoje,
    conversationDeterministico: rowData?.conversationDeterministico || ''
  }, true);
}


  // ao iniciar
  useEffect(init, []);

  function init() {
    // carregar listas de variaveis
    serverRequest.request('/procedure', { id_procedure: 420, parameters: [] }).then(r => {
      setTabulacoes(r[0]);
    });
  }

  function carregarDados(parametrosVisiveis) {
    tableRef.current.onQueryChange({ page: 0 });
    setParametrosVisiveis(parametrosVisiveis);
  }

  function consultar(query) {
    return new Promise((resolve, reject) => {
      serverRequest.request('/procedure', {
        id_procedure: 410,
        parameters: [
          `${filtros.dtini} ${filtros.hrini}:00`,
          `${filtros.dtfim} ${filtros.hrfim}:59`,
          JSON.stringify(filtros.tabulacao.map(Number)),
          filtros.telefone,
          filtros.documento,
          query.page * query.pageSize,
          query.pageSize
        ]
      }).then(r => {
        resolve({
          data: r[0],
          page: query.page,
          totalCount: r[1][0].total,
        })

      });
    })
  }

  return <>

    <Card>
      <CardHeader>
        <h5 className="pull-left">
          <i className="fa fa-sliders mr-2"></i>Buscar ligações
        </h5>
        <Button onClick={toggleParametrosVisiveis} size="sm" className="pull-right">
          <i className={`${parametrosVisiveis ? "fa fa-minus" : "fa fa-plus"}`} />
        </Button>
      </CardHeader>
      <Collapse isOpen={parametrosVisiveis}>
        <CardBody>

          <Row>
            <Col sm={8} md={4}>
              <FormGroup>
                <Label>Data Inicial:</Label>
                <DateInput
                  id="filtros-dtini"
                  name="dtini"
                  value={filtros.dtini}
                  onChange={(e) => { setFiltros({ ...filtros, dtini: e.target.value, dtfim: e.target.value.substring(0, 8).concat(filtros.dtfim.slice(-2)) }); }} />
              </FormGroup>
            </Col>
            <Col sm={4} md={2}>
              <FormGroup>
                <Label>Horário Inicial:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fa fa-clock-o" /></InputGroupText>
                  </InputGroupAddon>
                  <Input value={filtros.hrini} onChange={(e) => { setFiltros({ ...filtros, hrini: e.target.value }) }} maxlength="5"></Input>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col sm={8} md={4}>
              <FormGroup>
                <Label>Data Final:</Label>
                <DateInput
                  id="filtros-dtfim"
                  name="dtfim"
                  value={filtros.dtfim}
                  onChange={(e) => { setFiltros({ ...filtros, dtfim: e.target.value, dtini: e.target.value.substring(0, 8).concat(filtros.dtini.slice(-2)) }) }} />
              </FormGroup>
            </Col>
            <Col sm={4} md={2}>
              <FormGroup>
                <Label>Horário Final:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fa fa-clock-o" /></InputGroupText>
                  </InputGroupAddon>
                  <Input value={filtros.hrfim} onChange={(e) => { setFiltros({ ...filtros, hrfim: e.target.value }) }} maxlength="5"></Input>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Tabulação:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fa fa-list" /></InputGroupText>
                  </InputGroupAddon>
                  <MultipleSelect
                    id="select-status"
                    name="tabulacao"
                    multiple="multiple"
                    options={{ filter: true, selectAll: false, placeholder: "Selecione" }}
                    value={filtros.tabulacao}
                    onChange={(e) => { setFiltros({ ...filtros, tabulacao: e.target.value }) }}>
                    {
                      tabulacoes.map(t => {
                        return <option key={t.id_tabulacao} value={t.id_tabulacao}>{t.ds_tabulacao}</option>
                      })
                    }
                  </MultipleSelect>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Telefone:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fa fa-phone" /></InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={filtros.telefone}
                    onChange={(e) => { setFiltros({ ...filtros, telefone: e.target.value }) }}
                    title="Exemplo: 11988887777" />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Documento:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fa fa-id-card" /></InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={filtros.documento}
                    onChange={(e) => { setFiltros({ ...filtros, documento: e.target.value }) }}
                    title="Exemplo: 12345678910" />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button onClick={() => carregarDados(false)} className="pull-right mb-2">Buscar <i className="fa fa-search" /></Button>
        </CardFooter>
      </Collapse>
    </Card>
    <AlertMessage />


    {/*RESULTADOS*/}
    <Row>
      <Col lg={12}>
        <Card>
          <CardHeader>
            <h5 className="pull-left">Resultados</h5>
          </CardHeader>
          <CardBody>
            <MaterialTable
              title=""
              tableRef={tableRef}
              columns={columns}
              data={consultar}
              localization={localization}
              options={{ search: false, sorting: false, pageSize: 10, toolbar: false }} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </>;
}


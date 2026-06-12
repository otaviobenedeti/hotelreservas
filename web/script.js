const url = 'http://localhost:3000';

const quartos = [];
let quartoAtual = null;

carregarQuartos();

function carregarQuartos() {
    fetch(url + '/quartos/listar')
        .then(response => response.json())
        .then(data => {
            quartos.length = 0;
            quartos.push(...data);
            listarCards();
        })
        .catch(() => alert('Problemas com a conexão da API'));
}

function listarCards() {
    const container = document.querySelector('main');
    container.innerHTML = '';

    quartos.forEach(quarto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>Quarto ${quarto.numero}</h3>
            <p>Tipo: ${quarto.tipo ?? 'Não informado'}</p>
        `;

        card.onclick = () => abrirQuarto(quarto);

        container.appendChild(card);
    });
}

function abrirQuarto(quarto) {
    quartoAtual = quarto;

    tituloReceita.innerText = `Quarto ${quarto.numero}`;

    nomeEdit.value = quarto.numero;
    tipoEdit.value = quarto.tipo || '';

    detalhes.classList.remove('oculto');
}

document.querySelector('#formCad').addEventListener('submit', function (e) {
    e.preventDefault();

    const novoQuarto = {
        numero: Number(nome.value),
        tipo: tipo.value
    };

    fetch(url + '/quartos/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoQuarto)
    })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            alert('Quarto cadastrado com sucesso!');
            cadastro.classList.add('oculto');
            carregarQuartos();
            formCad.reset();
        })
        .catch(() => alert('Erro ao cadastrar quarto'));
});

function salvarEdicao() {
    const quartoEditado = {
        numero: Number(nomeEdit.value),
        tipo: tipoEdit.value
    };

    fetch(url + '/quartos/atualizar/' + quartoAtual.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quartoEditado)
    })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            alert('Quarto atualizado com sucesso!');
            detalhes.classList.add('oculto');
            carregarQuartos();
        })
        .catch(() => alert('Erro ao atualizar quarto'));
}

function excluirQuartoAtual() {
    if (!confirm('Deseja excluir este quarto?')) return;

    fetch(url + '/quartos/excluir/' + quartoAtual.id, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            alert('Quarto excluído com sucesso!');
            detalhes.classList.add('oculto');
            carregarQuartos();
        })
        .catch(() => alert('Erro ao excluir quarto'));
}


const reservas = [];
let reservaAtual = null;

carregarReservas();

function carregarReservas() {
    fetch(url + '/reservas/listar')
        .then(response => response.json())
        .then(data => {
            reservas.length = 0;
            reservas.push(...data);
            listarReservas();
        })
        .catch(() => console.log('Erro ao carregar reservas'));
}

function listarReservas() {

    const lista = document.getElementById('listaReservas');

    if (!lista) return;

    lista.innerHTML = '';

    reservas.forEach(reserva => {

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
    <h3>${reserva.hospede}</h3>
    <p>Quarto: ${reserva.quarto_id}</p>
    <p>Entrada: ${new Date(reserva.data_entrada).toLocaleDateString()}</p>
    <p>Saída: ${reserva.data_saida ? new Date(reserva.data_saida).toLocaleDateString() : '-'}</p>
`;

        card.onclick = () => abrirReserva(reserva);

        lista.appendChild(card);
    });
}

document.querySelector('#formReserva')?.addEventListener('submit', function (e) {

    e.preventDefault();

    const novaReserva = {
        hospede: hospede.value,
        data_entrada: dataEntrada.value,
        data_saida: dataSaida.value,
        quarto_id: Number(quartoId.value)
    };

    fetch(url + '/reservas/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaReserva)
    })
        .then(res => {
            console.log(res);
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            alert('Reserva cadastrada com sucesso!');
            cadastroReserva.classList.add('oculto');
            formReserva.reset();
            carregarReservas();
        })
        .catch((error) => {
            console.log(error);
            alert('Erro ao cadastrar reserva')
        });
});

function excluirReserva(id) {

    if (!confirm('Deseja excluir esta reserva?')) return;

    fetch(url + '/reservas/excluir/' + id, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            alert('Reserva excluída com sucesso!');
            carregarReservas();
        })
        .catch(() => alert('Erro ao excluir reserva'));
}

function abrirReserva(reserva) {

    reservaAtual = reserva;

    hospedeEdit.value = reserva.hospede || '';

    dataEntradaEdit.value =
        reserva.data_entrada.split('T')[0];

    dataSaidaEdit.value =
        reserva.data_saida
            ? reserva.data_saida.split('T')[0]
            : '';

    quartoIdEdit.value = reserva.quarto_id;

    detalhesReserva.classList.remove('oculto');
}

function salvarReserva() {

    const reservaEditada = {
        hospede: hospedeEdit.value,
        data_entrada: dataEntradaEdit.value,
        data_saida: dataSaidaEdit.value,
        quarto_id: Number(quartoIdEdit.value)
    };

    fetch(url + '/reservas/atualizar/' + reservaAtual.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaEditada)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        alert('Reserva atualizada com sucesso!');
        detalhesReserva.classList.add('oculto');
        carregarReservas();
    })
    .catch(() => alert('Erro ao atualizar reserva'));
}

function excluirReservaAtual() {

    if (!confirm('Deseja excluir esta reserva?'))
        return;

    fetch(url + '/reservas/excluir/' + reservaAtual.id, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Reserva excluída com sucesso!');
        detalhesReserva.classList.add('oculto');
        carregarReservas();
    })
    .catch(() => alert('Erro ao excluir reserva'));
}

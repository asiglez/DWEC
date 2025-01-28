const Utilidades = function () {
  const baraja = [
    {
      Identificador: 1,
      Palo: "Oros",
      Número: "1",
      Valor: 1,
    },
    {
      Identificador: 2,
      Palo: "Oros",
      Número: "2",
      Valor: 2,
    },
    {
      Identificador: 3,
      Palo: "Oros",
      Número: "3",
      Valor: 3,
    },
    {
      Identificador: 4,
      Palo: "Oros",
      Número: "4",
      Valor: 4,
    },
    {
      Identificador: 5,
      Palo: "Oros",
      Número: "5",
      Valor: 5,
    },
    {
      Identificador: 6,
      Palo: "Oros",
      Número: "6",
      Valor: 6,
    },
    {
      Identificador: 7,
      Palo: "Oros",
      Número: "7",
      Valor: 7,
    },
    {
      Identificador: 8,
      Palo: "Oros",
      Número: "Sota",
      Valor: 0.5,
    },
    {
      Identificador: 9,
      Palo: "Oros",
      Número: "Caballo",
      Valor: 0.5,
    },
    {
      Identificador: 10,
      Palo: "Oros",
      Número: "Rey",
      Valor: 0.5,
    },
    {
      Identificador: 11,
      Palo: "Copas",
      Número: "1",
      Valor: 1,
    },
    {
      Identificador: 12,
      Palo: "Copas",
      Número: "2",
      Valor: 2,
    },
    {
      Identificador: 13,
      Palo: "Copas",
      Número: "3",
      Valor: 3,
    },
    {
      Identificador: 14,
      Palo: "Copas",
      Número: "4",
      Valor: 4,
    },
    {
      Identificador: 15,
      Palo: "Copas",
      Número: "5",
      Valor: 5,
    },
    {
      Identificador: 16,
      Palo: "Copas",
      Número: "6",
      Valor: 6,
    },
    {
      Identificador: 17,
      Palo: "Copas",
      Número: "7",
      Valor: 7,
    },
    {
      Identificador: 18,
      Palo: "Copas",
      Número: "Sota",
      Valor: 0.5,
    },
    {
      Identificador: 19,
      Palo: "Copas",
      Número: "Caballo",
      Valor: 0.5,
    },
    {
      Identificador: 20,
      Palo: "Copas",
      Número: "Rey",
      Valor: 0.5,
    },
    {
      Identificador: 21,
      Palo: "Espadas",
      Número: "1",
      Valor: 1,
    },
    {
      Identificador: 22,
      Palo: "Espadas",
      Número: "2",
      Valor: 2,
    },
    {
      Identificador: 23,
      Palo: "Espadas",
      Número: "3",
      Valor: 3,
    },
    {
      Identificador: 24,
      Palo: "Espadas",
      Número: "4",
      Valor: 4,
    },
    {
      Identificador: 25,
      Palo: "Espadas",
      Número: "5",
      Valor: 5,
    },
    {
      Identificador: 26,
      Palo: "Espadas",
      Número: "6",
      Valor: 6,
    },
    {
      Identificador: 27,
      Palo: "Espadas",
      Número: "7",
      Valor: 7,
    },
    {
      Identificador: 28,
      Palo: "Espadas",
      Número: "Sota",
      Valor: 0.5,
    },
    {
      Identificador: 29,
      Palo: "Espadas",
      Número: "Caballo",
      Valor: 0.5,
    },
    {
      Identificador: 30,
      Palo: "Espadas",
      Número: "Rey",
      Valor: 0.5,
    },
    {
      Identificador: 31,
      Palo: "Bastos",
      Número: "1",
      Valor: 1,
    },
    {
      Identificador: 32,
      Palo: "Bastos",
      Número: "2",
      Valor: 2,
    },
    {
      Identificador: 33,
      Palo: "Bastos",
      Número: "3",
      Valor: 3,
    },
    {
      Identificador: 34,
      Palo: "Bastos",
      Número: "4",
      Valor: 4,
    },
    {
      Identificador: 35,
      Palo: "Bastos",
      Número: "5",
      Valor: 5,
    },
    {
      Identificador: 36,
      Palo: "Bastos",
      Número: "6",
      Valor: 6,
    },
    {
      Identificador: 37,
      Palo: "Bastos",
      Número: "7",
      Valor: 7,
    },
    {
      Identificador: 38,
      Palo: "Bastos",
      Número: "Sota",
      Valor: 0.5,
    },
    {
      Identificador: 39,
      Palo: "Bastos",
      Número: "Caballo",
      Valor: 0.5,
    },
    {
      Identificador: 40,
      Palo: "Bastos",
      Número: "Rey",
      Valor: 0.5,
    },
  ];
  const barajarCartas = function () {
    const numeros =
      (1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40);
    const ordenar = numeros.sort(0.5 - Math.random());
    return ordenar;
  };
  const sumarCartas = function (mano) {
    let suma = 0;
    for (let i = 0; i < mano.length; i++) {
      for (let j = 0; j < baraja.length; j++) {
        const element = baraja[j];
        if (element.Identificador === mano[i]) {
          suma += element.Valor;
        }
      }
    }
    return suma;
  };
  const recuperarCarta = function (identificador) {
    let carta;
    for (let i = 0; i < baraja.length; i++) {
      const element = baraja[i];
      if (element.Identificador === identificador) {
        carta=element;
        break;
      }
    }
    return carta;
  };
};

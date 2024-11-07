window.addEventListener("unhandledrejection", event => {
    console.error("Promise rejeitada:", event.reason);
});

const toggle = document.getElementById('navbarToggle');
const overlay = document.getElementById('overlay');
const sidebar = document.getElementById('sidebar');

const links = [
    { name: "Início", href: "inicio" },
    { name: "A Empresa", href: "a-empresa" },
    { name: "Cases", href: "cases" },
];

const hashLinks = [
    { name: "Serviços", href: "inicio#servicos" },
    { name: "Fale Conosco", href: "inicio#contato" },
];

function createLinks(containerId) {
    const container = document.getElementById(containerId);
    const currentPath = window.location.pathname.split("/").pop();
    const fragment = document.createDocumentFragment();

    links.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.name;
        a.classList.add("efeito__links");

        if (currentPath === link.href.split("/").pop()) {
            a.classList.add("active");
        }

        li.appendChild(a);
        fragment.appendChild(li);
    });

    hashLinks.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.name;
        a.classList.add("efeito__links");

        li.appendChild(a);
        fragment.appendChild(li);
    });

    container.appendChild(fragment);
}

createLinks("navbarLinks");
createLinks("sidebarLinks");

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

const palavras = ["um site", "uma loja virtual", "o Instagram", "landing page", "um sistema"];
const efeitos = [
    { enter: "zoomIn", leave: "zoomOut" },
    { enter: "rotateIn", leave: "rotateOut" },
    { enter: "rotateIn", leave: "rotateOut" },
    { enter: "fadeIn", leave: "fadeOut" },
    { enter: "zoomIn", leave: "zoomOut" }
];
let index = 0;

function mudarPalavra() {
    const elemento = document.getElementById("mudanca__palavras");
    if (!elemento) return;
    elemento.classList.add(efeitos[index].leave);

    setTimeout(() => {
        elemento.textContent = palavras[index];
        elemento.classList.remove(efeitos[index].leave);
        elemento.classList.add(efeitos[index].enter);

        index = (index + 1) % palavras.length;
    }, 500);

    setTimeout(() => {
        elemento.classList.remove(efeitos[index === 0 ? palavras.length - 1 : index - 1].enter);
    }, 1000);

    setTimeout(mudarPalavra, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    const elemento = document.getElementById("mudanca__palavras");
    if (elemento) {
        mudarPalavra();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');

    const updateCount = (counter, totalTime) => {
        const target = +counter.getAttribute('data-count');
        let count = 0;
        const increment = target / totalTime;  // Incremento proporcional ao tempo total

        const suffix = counter.parentElement.id === 'cliques' ? ' K' : '';

        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                clearInterval(interval);
                counter.innerText = `+ ${target}${suffix}`;
            } else {
                counter.innerText = `+ ${Math.floor(count)}${suffix}`;
            }
        }, 1);  // Executa a cada 1ms para uma transição suave
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Encontrando o maior valor de data-count
                const maxCount = Math.max(...Array.from(counters).map(counter => +counter.getAttribute('data-count')));

                // Definindo o tempo total da animação (em ms), ajustável
                const totalTime = 2000; // Tempo total em milissegundos (2 segundos)

                counters.forEach(counter => updateCount(counter, totalTime));  // Inicia as contagens
                observer.unobserve(entry.target);  // Para observar novamente
            }
        });
    }, { threshold: 0.5 });

    const clientesSection = document.querySelector('#clientes');
    observer.observe(clientesSection);  // Observa a seção de clientes
});




const wppButton = document.getElementById('wpp-link');
const wppForm = document.getElementById('wpp-form');
const closeButton = document.getElementById('close-bt');
const phone = document.getElementById('telefone');
const mask = document.querySelector('#wpp-fix .mask');
const response = document.querySelector('#wpp-form .response-output');
const wppoptions = document.getElementById('wppoptions');

function getData(form) {
    var formData = new FormData(form);
    return Object.fromEntries(formData);
}

function phoneMask(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
}

phone.onkeyup = e => phone.value = phoneMask(e.target.value);

wppButton.onclick = () => {
    wppButton.classList.add('hide-this');
};

mask.onclick = () => {
    wppButton.classList.remove('hide-this');
};

closeButton.onclick = () => {
    wppButton.classList.remove('hide-this');
};

wppForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = getData(e.target);
    wppForm.classList.add('submitting');
    response.innerHTML += '<p>Você será redirecionado para o WhatsApp</p>';

    setTimeout(() => {
        wppForm.classList.remove('submitting');
        wppForm.classList.add('sent');

        setTimeout(() => {
            window.open(`https://api.whatsapp.com/send?text=Olá meu nome é ${formData.nome}, gostaria de saber mais sobre os seus serviços! Esses são os meus contatos:%0D%0A Telefone: ${formData.telefone} %0D%0A Email: ${formData.email}&phone=5551997421833`, '_blank');
        }, 700);

    }, 2000);

});

document.addEventListener('keyup', e => {
    if (e.key == 'Escape') {
        wppButton.classList.remove('hide-this');
    }
});

wppoptions.addEventListener('change', e => {
    let selectedItem = e.target.value;
});
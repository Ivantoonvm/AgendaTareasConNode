const inquirer =  require('inquirer');
require('colors');


const preguntas =[
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [   
            {
                value: '1',
                name: `${'1.'.yellow}Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.yellow}Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.yellow}Tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.yellow}Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.yellow}Completar tarea(s)`
            }
            ,
            {
                value: '6',
                name: `${'6.'.yellow}Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.yellow}Salir`
            }
        ]

    }   
]

const inquirerMenu = async() =>{
    console.clear();
    console.log('========================='.green);
    console.log(' Seleccione una opcion'.white);
    console.log('=========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}  

const pausa = async()=>{
    const question =[
        {
            type: 'input',
            name: 'ENTER',
            message: `Precione ${'ENTER'.green} para continuar`

        }
    ]    
    console.log('\n');
    await inquirer.prompt(question);
}

const leerinput = async(message) =>{
    const question = [
        {
            type : 'input',
            name: 'desc',
            message,
            validate(value)
            {
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar= async (tareas=[]) =>{
    const choices =  tareas.map((tarea,i) =>{
        const idx= `${i+1+'.'}`.green;
        return {
            value:  tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    });

    choices.unshift({
        value : '0',
        name: '0.'.green +'Cancelar'

    });

    const preguntas =[
        {
            type:'list',
            name: 'id',
            message:'Borrar',
            choices
        }

    ];
    const {id} = await inquirer.prompt(preguntas);
    return id;
}
const confirmar = async(message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}
const mostrarListadoChecklist= async (tareas=[]) =>{
    const choices =  tareas.map((tarea,i) =>{
        const idx= `${i+1+'.'}`.green;
        return {
            value:  tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true :false
        }
    });
    const pregunta =[
        {
            type:'checkbox',
            name: 'ids',
            message:'Seleccione',
            choices
        }

    ];
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}
module.exports={
    inquirerMenu,
    pausa,
    leerinput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
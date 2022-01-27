require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,pausa, leerinput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () =>{

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    
    if(tareasDB)
    {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do{
        //Imprecion del menu 
        opt = await inquirerMenu();
        switch(opt)
        {
            case '1':
                //CRear tarea
                const desc = await leerinput('Descripcion:');
                tareas.crearTarea(desc);   
            break;
            case '2':
                //impimir las tareas
                tareas.listadoCompleto();

            break;
            case '3':
                //listar completadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                //listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5'://completado
                   const ids=  await mostrarListadoChecklist(tareas.listadoArr);
                    tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0' ){
                    const ok = await confirmar('Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                    
                }
            break;            
        }

        guardarDB(tareas.listadoArr);

        if(opt!== '0')await pausa();
    
    }while(opt !== '0');
   
    console.clear();
}

main();


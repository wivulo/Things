export interface iTodo {
  id: number,
  name: string,
  done: boolean
}

export interface iListItemProps {
   todo: iData,
   onEdit?: (value: string) => void,
   onDelete: () => void,
   onMarkDone: () => void,
   hasEditedTodo: (id:number, value: string) => void
}

export interface iData{
   id: number,
   title: string,                                                                                   
   completed: boolean
}

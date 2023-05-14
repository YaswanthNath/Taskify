import React, { useState, useEffect } from 'react';
import { Head, AddNew, CardDiv, NavBar, NavBarItem2, ThreeDotsChild, ThreeDotsParent, BlurredBackdrop, ButtonComplete, ButtonProgress, ErrorText, CompletedTick } from './AllTasksStyle';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, Card, CardActions, CardContent, CardMedia, Typography, IconButton, Tooltip, InputLabel, MenuItem, FormControl, Box, Skeleton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Mode } from '@mui/icons-material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Tick from '../../Assets/tick.svg';

interface Task {
  id: string;
  title: string;
  description: string;
  duedate: string;
  category: string;
}

const ITEM_HEIGHT = 48;


function AllTasks() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'all' });
  const [selectCat, setSelectCat] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isRendering, setIsRendering] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [completedId, setCompletedId] = useState();
  const [onComClick, setOnComClick] = useState(false);
  const [onProgClick, setOnProgClick] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);
  const [editCopy, setEditCopy] = useState<Task | undefined>(undefined);
  const id = uuidv4();
  const [open, setOpen] = React.useState(false);
  const filteredTasks = tasks.filter(task => task.category === selectCat);
  const filteredComTasks = completedTasks.filter(task => task.category === selectCat);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteTask, setdeleteTask] = useState<Task | undefined>(undefined);
  useEffect(() => {
    if (completedId) {
      const into = tasks.find((task) => task.id === completedId);
      const remove = tasks.filter((task) => task.id !== completedId);

      if (into) {
        const newTask = {
          id: into.id,
          title: into.title,
          description: into.description,
          duedate: into.duedate,
          category: into.category
        };
        console.log(into, "into");
        console.log(newTask, "newTask");
        console.log(remove, "remove");
        setTasks(remove);
        const completedTasksLocal = localStorage.getItem('CompletedTasks')
        if (completedTasksLocal) {
          const completedTasksLocalString = JSON.parse(completedTasksLocal);
          const completedTasksLocalSet = [...completedTasksLocalString, newTask]
          console.log(completedTasksLocalSet);
          localStorage.setItem('CompletedTasks', JSON.stringify(completedTasksLocalSet));
          setCompletedTasks([...completedTasksLocalSet]);
        } else {
          localStorage.setItem('CompletedTasks', JSON.stringify([newTask]));
          setCompletedTasks([...completedTasks, newTask]);
        }
        // console.log(tasks, "tasks")
        localStorage.setItem('Tasks', JSON.stringify(remove));
        setCompletedId(undefined);
      }
    }
  }, [completedId]);

  useEffect(() => {
    const localStorageDataTasks = localStorage.getItem('Tasks');
    if (localStorageDataTasks) {
      const dataFromStorage = JSON.parse(localStorageDataTasks);
      //dataFromStorage.map((data:any)=>[setTasks(data)]);
      setTasks(dataFromStorage);
    }
    const localStorageDataCom = localStorage.getItem('CompletedTasks')
    if (localStorageDataCom) {
      const dataFromStorage = JSON.parse(localStorageDataCom);
      setCompletedTasks(dataFromStorage);
    }
  }, [])

  // useEffect(() => {
  //   if (editTask && open) {
  //     setEditCopy(editTask);
  //   }
  // }, [editTask]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRendering(false);
    }, 2000); // Adjust the delay time as needed (in milliseconds)

    return () => clearTimeout(timeout);
  }, []);

  const onSubmit = (data: any) => {
    const newTask = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      duedate: data.duedate,
      category: data.category
    };
    tasks.push(newTask)
    localStorage.setItem('Tasks', JSON.stringify(tasks));
    reset();

  }
  const handleChange = (event: SelectChangeEvent) => {
    setSelectCat(event.target.value);
  };
  // console.log(tasks)
  const onEditSubmit = (data: any) => { // new function to handle editing a task
    console.log(tasks, "t");
    if (editCopy) {
      const upd = tasks.map(task => {
        if (task.id === editCopy.id && editCopy !== data) {
          return {
            ...task,
            title: data.title,
            description: data.description,
            duedate: data.duedate,
            category: data.category
          };
        } else {
          return {
            ...task,
            title: editCopy.title,
            description: editCopy.description,
            duedate: editCopy.duedate,
            category: editCopy.category
          };
        }
      });
      setTasks(upd);
      const a=localStorage.getItem('Tasks');
      console.log(a);
      //localStorage.setItem('Tasks', JSON.stringify(upd));
    }

    setEditTask(undefined);
    setEditCopy(undefined);
    reset();
  }
  const handleEdit = (id: string, field: string, value: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          [field]: value//it is changing directly from card to task value
        }
      }
      return task;
    }));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
   
    setOpen(false);

  };
  const handleEditClick = (task: Task) => { // new function to handle edit icon click
    setEditTask(task);
    setEditCopy(task);
    setOpen(true);
  };
  const handleDeleteClick = (agree: any) => {
    if (agree && deleteTask) {
      const updTask = tasks.filter((task) => task.id !== deleteTask.id);
      const updComTask = completedTasks.filter((task) => task.id !== deleteTask.id);
      setTasks(updTask);
      setCompletedTasks(updComTask);
      localStorage.setItem('Tasks', JSON.stringify(updTask));
      localStorage.setItem('CompletedTasks', JSON.stringify(updComTask));
    }
    setdeleteTask(undefined);
    setOpenDialog(false);
  };

  const handleDialogClose = (task: Task) => {
    setOpenDialog(true);
    setdeleteTask(task);
  };
  const [showSelect, setShowSelect] = useState(false);

  const handleSymbolClick = () => {
    setShowSelect(true);
  };
  const renderCardContent = () => {
    if (isRendering) {
      return (
        <Card sx={{ width: 300, height: 100, backgroundColor: 'white' }}>
          <Skeleton />
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Card>
      );
    }
    if (!onComClick) {
      if ((selectCat === '' || selectCat === 'All') && onProgClick) {
        return tasks.length > 0 && tasks.map((task, index) => (
          <Card sx={{ width: '30%', margin: '10px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)' }} key={index}>
            <button onClick={handleSymbolClick}>!!!</button>
            {showSelect &&
              <ThreeDotsParent>
                <ThreeDotsChild >
                  <select id={task.id} value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Select...</option>
                    <option value="Completed">Completed</option>
                    <option value="Progress">Progress</option>
                    <option value="Others">Others</option>
                  </select>
                </ThreeDotsChild>
              </ThreeDotsParent>}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.duedate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.category}
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Delete">
                <IconButton sx={{ '&:hover': { backgroundColor: '#f00', color: '#fff' }, }} onClick={() => handleDialogClose(task)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton sx={{ '&:hover': { backgroundColor: '#3CB371', color: '#fff' }, }} onClick={() => handleEditClick(task)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
            <Dialog
              open={openDialog}
              onClose={() => handleDeleteClick(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{ marginTop: '-15%' }}
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you want to Delete this task?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => handleDeleteClick(false)}>Disagree</Button>
                <Button onClick={() => handleDeleteClick(true)} autoFocus>Agree</Button>
              </DialogActions>
            </Dialog>
          </Card>
        ));
      } else {
        if (filteredTasks.length > 0) {
          return filteredTasks.map((task) => (
            <Card sx={{ width: '30%', margin: '10px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.duedate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Delete">
                  <IconButton sx={{ '&:hover': { backgroundColor: '#f00', color: '#fff' }, }} onClick={() => handleDialogClose(task)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton sx={{ '&:hover': { backgroundColor: '#3CB371', color: '#fff' }, }} onClick={() => handleEditClick(task)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
              <Dialog
                open={openDialog}
                onClose={() => handleDeleteClick(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ marginTop: '-15%' }}
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to Delete this task?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={() => handleDeleteClick(false)}>Disagree</Button>
                  <Button onClick={() => handleDeleteClick(true)} autoFocus>Agree</Button>
                </DialogActions>
              </Dialog>
            </Card>
          ));
        } else { return (<h1>There are no tasks for this selected Category</h1>) }
      }
    } else {
      if (selectCat === '' || selectCat === 'All') {
        if (completedTasks.length > 0) {
          return completedTasks.map((task) => (
            <Card sx={{ width: '30%', margin: '10px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)' }}>
              <ThreeDotsParent>
                <ThreeDotsChild >
                  <CompletedTick src={Tick} />
                </ThreeDotsChild>
              </ThreeDotsParent>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.duedate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Delete">
                  <IconButton sx={{ '&:hover': { backgroundColor: '#f00', color: '#fff' }, }} onClick={() => handleDialogClose(task)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton sx={{ '&:hover': { backgroundColor: '#3CB371', color: '#fff' }, }} onClick={() => handleEditClick(task)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
              <Dialog
                open={openDialog}
                onClose={() => handleDeleteClick(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ marginTop: '-15%' }}
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to Delete this task?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={() => handleDeleteClick(false)}>Disagree</Button>
                  <Button onClick={() => handleDeleteClick(true)} autoFocus>Agree</Button>
                </DialogActions>
              </Dialog>
            </Card>
          ));
        } else {
          return onComClick && completedTasks.length === 0 && <h1>There are no tasks for this selected Category</h1>;
        }
      } else {
        if (filteredComTasks.length > 0) {
          return filteredComTasks.map((task) => (
            <Card sx={{ width: '30%', margin: '10px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)' }}>
              <ThreeDotsParent>
                <ThreeDotsChild >
                  <CompletedTick src={Tick} />
                </ThreeDotsChild>
              </ThreeDotsParent>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.duedate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Delete">
                  <IconButton sx={{ '&:hover': { backgroundColor: '#f00', color: '#fff' }, }} onClick={() => handleDeleteClick(task)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton sx={{ '&:hover': { backgroundColor: '#3CB371', color: '#fff' }, }} onClick={() => handleEditClick(task)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ));
        } else {
          return filteredComTasks.length === 0 && <h1>There are no tasks for this selected Category</h1>;
        }
      }
    }
  };

  //Option Menu

  const handleOptionChange = (event: any) => {
    if (event.target.value == 'Completed') {
      setCompletedId(event.target.getAttribute('id'));
    }
  };
  return (
    <div>
      <Head>
        <h1 style={{ marginLeft: '30px' }}>Taskify</h1>
        <AddNew onClick={handleClickOpen}><IconButton style={{ width: '32px', height: '35px', marginRight: '5px' }}><PlaylistAddIcon /></IconButton>Add new</AddNew>
      </Head>
      <NavBar>
        <FormControl sx={{ m: 1, minWidth: 120, marginLeft: '2%' }}>
          <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectCat}
            onChange={handleChange}
            autoWidth
            label="Category"
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Work'}>Work</MenuItem>
            <MenuItem value={'Personal'}>Personal</MenuItem>
            <MenuItem value={'Others'}>Others</MenuItem>
          </Select>
        </FormControl>
        <NavBarItem2>
          <ButtonProgress onClick={() => { setOnProgClick(true); setOnComClick(false); }}><IconButton><FormatListBulletedIcon /></IconButton>Progress {tasks.length}</ButtonProgress>
          <ButtonComplete onClick={() => { setOnComClick(true); setOnProgClick(false); }}><IconButton><PlaylistAddCheckIcon /></IconButton>Completed {completedTasks.length}</ButtonComplete>
        </NavBarItem2>
      </NavBar>
      <div>
        <BlurredBackdrop open={open} onClick={handleClose} invisible />
        <Dialog open={open} onClose={handleClose} sx={{ width: '30%', height: '70%', marginTop: '5%', marginLeft: '35%', display: 'flex', justifyContent: 'center' }}>
          <DialogContent sx={{ width: '85%' }}>
            {(editTask) ? (
              <form onSubmit={handleSubmit(onEditSubmit)}>
                <h3>Title </h3>
                <TextField {...register('titleEd', { required: true })} autoFocus onChange={(e) => handleEdit(editTask.id, 'title', e.target.value)} value={tasks.find(task => task.id === editTask.id)?.title} margin="dense" label="Title" type="text" fullWidth variant="standard" sx={{ m: 0, p: 0 }} />
                {errors.titleEd && errors.titleEd.type === "required" && (<ErrorText>Task Title is Required</ErrorText>)}
                <TextField {...register('descriptionEd', { required: true })} onChange={(e) => handleEdit(editTask.id, 'description', e.target.value)} value={tasks.find(task => task.id === editTask.id)?.description} margin="dense" label="Description" type="text" fullWidth variant="standard" sx={{ m: 0, p: 0 }} />
                {errors.descriptionEd && errors.descriptionEd.type === "required" && (<ErrorText>Task Description is Required</ErrorText>)}
                <TextField {...register('duedateEd', { required: true })} onChange={(e) => handleEdit(editTask.id, 'duedate', e.target.value)} value={tasks.find(task => task.id === editTask.id)?.duedate} margin="dense" label="Due date" type="text" fullWidth variant="standard" sx={{ m: 0, p: 0 }} />
                {errors.duedateEd && errors.duedateEd.type === "required" && (<ErrorText>Password is required</ErrorText>)}
                <TextField {...register('categoryEd', { required: true })} onChange={(e) => handleEdit(editTask.id, 'category', e.target.value)} value={tasks.find(task => task.id === editTask.id)?.category} margin="dense" label="Category" type="text" fullWidth variant="standard" sx={{ m: 0, p: 0 }} />
                {errors.categoryEd && errors.categoryEd.type === "required" && (<ErrorText>Password is required</ErrorText>)}
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit' onClick={() => setOpen(false)}>Update</Button>
                </DialogActions>
              </form>) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register('title', { required: true })} margin="dense" label="Title" type="text" fullWidth variant="standard" sx={{ m: 0, p: 0 }} />
                {errors.title && errors.title.type === "required" && (<ErrorText>Password is required</ErrorText>)}
                <TextField {...register('description', { required: true })} margin="dense" label="Description" type="text" fullWidth variant="standard" sx={{ m: 0, p: 0 }} />
                {errors.description && errors.description.type === "required" && (<ErrorText>Password is required</ErrorText>)}
                <TextField {...register('duedate', { required: true })} margin="dense" label="Due date" type="text" fullWidth variant="standard" sx={{ m: 0, p: 0 }} />
                {errors.duedate && errors.duedate.type === "required" && (<ErrorText>Password is required</ErrorText>)}
                <TextField {...register('category', { required: true })} margin="dense" label="Category" type="text" fullWidth variant="standard" sx={{ m: 0, p: 0 }} />
                {errors.category && errors.category.type === "required" && (<ErrorText>Password is required</ErrorText>)}
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit' onClick={() => setOpen(false)}>Save</Button>
                </DialogActions>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div style={{ marginLeft: '6px' }}>
        <CardDiv >
          {renderCardContent()}
        </CardDiv>
      </div>

    </div>
  );
}

export default AllTasks;

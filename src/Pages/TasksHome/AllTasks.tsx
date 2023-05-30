import React, { useState, useEffect } from 'react';
import { Head, AddNew, CardDiv, ComButton, NavBar, Logo, NavBarItem2, LogoImg, EmptyDataText, ThreeDotsChild, ThreeDotsParent, BlurredBackdrop, ButtonComplete, ButtonProgress, LogoPart, CompletedTick, ContainerTasks } from './AllTasksStyle';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, Card, CardActions, CardContent, CardMedia, Typography, IconButton, Tooltip, InputLabel, MenuItem, FormControl, Box, Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Mode } from '@mui/icons-material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Tick from '../../Assets/tick.svg';
import { useMediaQuery, Badge } from '@material-ui/core';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import logoTaskify from '../../Assets/LogoImg.svg'

interface Task {
  id: string;
  title: string;
  description: string;
  duedate: string;
  category: string;
}

function AllTasks() {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({ mode: 'all' });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | undefined>();
  const [open, setOpen] = useState(false);
  const [selectCat, setSelectCat] = useState('');
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [completedId, setCompletedId] = useState();
  const [onComClick, setOnComClick] = useState(false);
  const [deleteTask, setdeleteTask] = useState<Task | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [onProgClick, setOnProgClick] = useState(true);
 const [countProgValue, setCountProgValue] = useState(0);
 const [countComValue, setCountComValue] = useState(0);


  const filteredTasks = tasks.filter((task) => task.category === selectCat);
  const filteredComTasks = completedTasks.filter(task => task.category === selectCat);
  const isSmallScreen = useMediaQuery('(max-width: 660px)');

  useEffect(() => {
    const localStorageDataTasks = localStorage.getItem('Tasks');
    if (localStorageDataTasks) {
      const dataFromStorage = JSON.parse(localStorageDataTasks);
      setTasks(dataFromStorage);
    }
    const localStorageDataComTasks = localStorage.getItem('CompletedTasks');
    if (localStorageDataComTasks) {
      const dataFromStorage = JSON.parse(localStorageDataComTasks);
      setCompletedTasks(dataFromStorage);
    }
  }, []);
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
        setTasks(remove);
        const completedTasksLocal = localStorage.getItem('CompletedTasks')
        if (completedTasksLocal) {
          const completedTasksLocalString = JSON.parse(completedTasksLocal);
          const completedTasksLocalSet = [...completedTasksLocalString, newTask]
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
  const handleChange = (event: SelectChangeEvent) => {
    setSelectCat(event.target.value);
  };
  const handleClickOpen = () => {
    setEditTask(undefined);
    reset();
    setOpen(true);
  };
  const onSubmit = (data: any) => {
    if (editTask) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editTask.id) {
          return {
            ...task,
            title: data.title,
            description: data.description,
            duedate: data.duedate,
            category: data.category,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
    } else {
      const id = uuidv4();
      const newTask: Task = {
        id: id,
        title: data.title,
        description: data.description,
        duedate: data.duedate,
        category: data.category,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      localStorage.setItem('Tasks', JSON.stringify([...tasks, newTask]));
    }
    setEditTask(undefined);
    setOpen(false);
  };
  const handleEditClick = (task: Task) => {
    setEditTask(task);
    setOpen(true);
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('duedate', task.duedate);
    setValue('category', task.category);
    console.log(task.category);
  };
  const handleDelete = (agree: any) => {
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
  const handleOptionChange = (event: any, id: any) => {
    setCompletedId(id);
    console.log(id);
  };
  const handleDialogClose = (task: Task) => {
    setOpenDialog(true);
    setdeleteTask(task);
  };
  const renderTasks = () => {

    if (!onComClick) {
      if (tasks.length == 0) {
        //setCountProgValue(tasks.length);
        return (
          <EmptyDataText>Add New Tasks</EmptyDataText>
        )
      }
      if ((selectCat === '' || selectCat === 'All') && onProgClick) {
        if (tasks.length > 0) {
          return tasks.map((task, index) => (
            <Card sx={{
              width: '30%', margin: '16px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', '@media (max-width: 600px)': {
                width: '90%',
                marginTop: '0',
                marginLeft: '9px'
              }
            }} key={index}>
              <ThreeDotsParent>
                <ThreeDotsChild >
                  <ComButton onClick={(e) => handleOptionChange(e, task.id)}>Completed ?</ComButton>
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
                  <IconButton sx={{
                    '&:hover': { backgroundColor: '#f00', color: 'white', borderRadius: '10px' }, '@media (max-width: 600px)': {
                      backgroundColor: '#f00', color: '#fff', borderRadius: '10px'
                    }
                  }} onClick={() => handleDialogClose(task)}>
                    <Typography variant="body2">Delete</Typography>
                    <DeleteIcon sx={{ color: 'red', '&:hover': { color: 'white' } }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton sx={{
                    '&:hover': { backgroundColor: '#3CB371', color: 'white', borderRadius: '10px' }, '@media (max-width: 600px)': {
                      backgroundColor: '#3CB371', color: '#fff', borderRadius: '10px'
                    }
                  }} onClick={() => handleEditClick(task)}>
                    <Typography variant="body2">Edit</Typography>
                    <EditIcon sx={{ color: '#3CB371', '&:hover': { color: 'white' } }} />
                  </IconButton>
                </Tooltip>
              </CardActions>
              <Dialog
                open={openDialog}
                onClose={() => handleDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ marginTop: '-15%' }}
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to Delete this task?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={() => handleDelete(false)}>Disagree</Button>
                  <Button onClick={() => handleDelete(true)} autoFocus>Agree</Button>
                </DialogActions>
              </Dialog>
            </Card>)
          );
        }
      }
      else {
        if (filteredTasks.length > 0) {
          return filteredTasks.map((task) => (
            <Card sx={{
              width: '30%', margin: '10px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', '@media (max-width: 600px)': {
                width: '91%',
                marginTop: '0',
                marginLeft: '8px'
              }
            }}>
              <ThreeDotsParent>
                <ThreeDotsChild >
                  <ComButton onClick={(e) => handleOptionChange(e, task.id)}>Completed ?</ComButton>
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
                  <IconButton sx={{
                    '&:hover': {
                      backgroundColor: '#f00', color: '#fff', borderRadius: '10px'
                    }, '@media (max-width: 600px)': {
                      backgroundColor: '#f00', color: '#fff', borderRadius: '10px'
                    }

                  }} onClick={() => handleDialogClose(task)}>
                    <Typography variant="body2">Delete</Typography>
                    <DeleteIcon sx={{ color: '#f00', '&:hover': { color: 'white' } }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton sx={{
                    '&:hover': { backgroundColor: '#3CB371', color: '#fff' }, '@media (max-width: 600px)': {
                      backgroundColor: '#3CB371', color: '#fff', borderRadius: '10px'
                    }
                  }} onClick={() => handleEditClick(task)}>
                    <Typography variant="body2">Edit</Typography>
                    <EditIcon sx={{ color: '#3CB371', '&:hover': { color: 'white' } }} />
                  </IconButton>
                </Tooltip>
              </CardActions>
              <Dialog
                open={openDialog}
                onClose={() => handleDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ marginTop: '-15%' }}
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to Delete this task?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={() => handleDelete(false)}>Disagree</Button>
                  <Button onClick={() => handleDelete(true)} autoFocus>Agree</Button>
                </DialogActions>
              </Dialog>
            </Card>
          ));
        } else {
          //setCountProgValue(0);
          return (<EmptyDataText>There are no tasks for this selected Category</EmptyDataText>)
        }
      }
    }
    else {
      if (selectCat === '' || selectCat === 'All') {
        if (completedTasks.length > 0) {
          //setCountComValue(completedTasks.length);
          return completedTasks.map((task) => (
            <Card sx={{
              width: '30%', margin: '10px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', '@media (max-width: 375px)': {
                width: '92%',
                marginTop: '0',
                marginLeft: '8px'
              }
            }}>
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
                  <IconButton sx={{
                    '&:hover': { backgroundColor: '#f00', color: '#fff', borderRadius: '10px' }, '@media (max-width: 600px)': {
                      backgroundColor: '#f00', color: '#fff', borderRadius: '10px'
                    }
                  }} onClick={() => handleDialogClose(task)}>
                    <Typography variant="body2">Delete</Typography>
                    <DeleteIcon sx={{ color: '#f00', '&:hover': { color: 'white' } }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                  <IconButton sx={{
                    '&:hover': { backgroundColor: '#3CB371', color: '#fff', borderRadius: '10px', cursor: 'not-allowed' }, '@media (max-width: 600px)': {
                      backgroundColor: '#3CB371', color: '#fff', borderRadius: '10px'
                    }
                  }} >
                    <Typography variant="body2">Edit</Typography>
                    <EditIcon sx={{ color: '#3CB371', '&:hover': { color: 'white' } }} />
                  </IconButton>
                </Tooltip>
              </CardActions>
              <Dialog
                open={openDialog}
                onClose={() => handleDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ marginTop: '-15%' }}
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to Delete this task?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={() => handleDelete(false)}>Disagree</Button>
                  <Button onClick={() => handleDelete(true)} autoFocus>Agree</Button>
                </DialogActions>
              </Dialog>
            </Card>
          ));
        } else {
          return onComClick && completedTasks.length === 0 && <EmptyDataText>There are no Completed tasks</EmptyDataText>;
        }
      } else {
        if (filteredComTasks.length > 0) {
          //setCountComValue(filteredTasks.length);
          return filteredComTasks.map((task) => (
            <Card sx={{
              width: '30%', margin: '10px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)', '@media (max-width: 375px)': {
                width: '92%',
                marginTop: '0',
                marginLeft: '8px'
              }
            }}>
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
                  <IconButton sx={{
                    '&:hover': { backgroundColor: '#f00', color: '#fff', borderRadius: '10px' }, '@media (max-width: 600px)': {
                      backgroundColor: '#f00', color: '#fff', borderRadius: '10px'
                    }
                  }} onClick={() => handleDialogClose(task)}>
                    <Typography variant="body2">Delete</Typography>
                    <DeleteIcon sx={{ color: '#f00', '&:hover': { color: 'white' } }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton sx={{
                    '&:hover': { backgroundColor: '#3CB371', color: '#fff', borderRadius: '10px', cursor: 'not-allowed' }, '@media (max-width: 600px)': {
                      backgroundColor: '#3CB371', color: '#fff', borderRadius: '10px'
                    }
                  }} >
                    <Typography variant="body2">Edit</Typography>
                    <EditIcon sx={{ color: '#3CB371', '&:hover': { color: 'white' } }} />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ));
        }
        else {
          //setCountComValue(0);
          return filteredComTasks.length === 0 && <EmptyDataText>There are no Completed tasks for this Category</EmptyDataText>;
        }
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ContainerTasks>
      <Head>
        <LogoPart>
          <LogoImg src={logoTaskify} />
          <Logo>Taskify</Logo>
        </LogoPart>
        <AddNew onClick={handleClickOpen}><IconButton  ><PlaylistAddIcon /></IconButton>Add new</AddNew>
      </Head>
      <NavBar>
        <FormControl sx={{
          m: 1, minWidth: 120, marginLeft: '25px', color: 'white', '& label': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
            '& .MuiSelect-icon': {
              color: 'white', // Change the color of the select arrow to white
            },
            '& input::selection': {
              background: 'white',
              color: 'black',
            },
          }, '@media (max-width: 600px)': {
            marginLeft: '17px;'
          }
        }}>
          <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectCat}
            onChange={handleChange}
            autoWidth
            label="Category"
            sx={{ color: 'white' }}
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Work'}>Work</MenuItem>
            <MenuItem value={'Personal'}>Personal</MenuItem>
            <MenuItem value={'Others'}>Others</MenuItem>
          </Select>
        </FormControl>
        <NavBarItem2>
          {isSmallScreen ?
            <>
              <ButtonProgress onClick={() => { setOnProgClick(true); setOnComClick(false); }}>
                <Badge badgeContent={tasks.length} color="secondary">
                  <MailIcon sx={{ width: '30px', height: '30px' }} color="action" />
                </Badge></ButtonProgress>
              <ButtonComplete onClick={() => { setOnComClick(true); setOnProgClick(false); }}>
                <Badge badgeContent={completedTasks.length} color="secondary">
                  <AssignmentTurnedInIcon sx={{ width: '30px', height: '30px' }} color="action" />
                </Badge>
              </ButtonComplete>
            </> :
            <>
              <ButtonProgress onClick={() => { setOnProgClick(true); setOnComClick(false); }}><IconButton><FormatListBulletedIcon /></IconButton>Progress {tasks.length}</ButtonProgress>
              <ButtonComplete onClick={() => { setOnComClick(true); setOnProgClick(false); }}><IconButton><PlaylistAddCheckIcon /></IconButton>Completed {completedTasks.length}</ButtonComplete>
            </>
          }
        </NavBarItem2>
      </NavBar>
      <div>
        <CardDiv>
          {renderTasks()}
        </CardDiv>
        <BlurredBackdrop open={open} onClick={handleClose} invisible />
        <Dialog open={open} onClose={() => setOpen(false)} sx={{
          width: '30%', marginTop: '5%', marginLeft: '35%', display: 'flex', justifyContent: 'center', '@media (max-width: 600px)': { width: '100%', height: '100%', marginTop: '0', marginLeft: '0' }
        }}>
          <DialogTitle>{editTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('title', { required: true })}
                label="Title"
                sx={{ marginBottom: '5px', marginTop: '5px' }}
                fullWidth
                error={!!errors.title}
                helperText={errors.title ? 'Title is required' : ''}
              />
              <TextField
                {...register('description', { required: true })}
                label="Description"
                sx={{ marginBottom: '5px' }}
                fullWidth
                error={!!errors.description}
                helperText={errors.description ? 'Description is required' : ''}
              />
              <TextField
                {...register('duedate', { required: true })}
                label="Due Date"
                sx={{ marginBottom: '5px' }}
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  style: { marginTop: '8px' },
                  type: 'date',
                  inputProps: {
                    min: new Date().toISOString().split('T')[0],
                  },
                }}
                fullWidth
                error={!!errors.duedate}
                helperText={errors.duedate ? 'Due Date is required' : ''}
              />
              <TextField
                {...register('category', { required: true })}
                label="Category"
                sx={{ marginBottom: '5px' }}
                fullWidth
                select
                data-testid='allcategory'
                error={!!errors.category}
                helperText={errors.category ? 'Category is required' : ''}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField >
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">{editTask ? 'Save' : 'Add'}</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div >
    </ContainerTasks >
  );
}

export default AllTasks;

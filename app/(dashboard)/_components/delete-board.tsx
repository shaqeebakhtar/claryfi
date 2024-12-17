import DeleteBoardDialog from './delete-board-dialog';

const DeleteBoard = () => {
  return (
    <div className="space-y-4 p-4 border border-destructive rounded-lg bg-destructive/5">
      <div className="space-y-1">
        <h2 className="text-base font-medium text-destructive">Delete Board</h2>
        <p className="text-sm text-muted-foreground">
          Deleting your board will also delete all the feedbacks and others
          things associated with it.
        </p>
      </div>
      <DeleteBoardDialog />
    </div>
  );
};

export default DeleteBoard;

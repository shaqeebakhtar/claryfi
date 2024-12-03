import BoardName from '@/app/(dashboard)/_components/board-name';
import BoardSlug from '@/app/(dashboard)/_components/board-slug';
import DeleteBoard from '@/app/(board)/_components/delete-board';
import UploadLogo from '@/app/(dashboard)/_components/upload-logo';

const AdminSettings = () => {
  return (
    <>
      <BoardName />
      <BoardSlug />
      <UploadLogo />
      <DeleteBoard />
    </>
  );
};

export default AdminSettings;

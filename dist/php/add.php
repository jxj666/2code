<?php
/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-01-25 13:29:44
 * @LastEditTime: 2020-01-21 10:53:57
 * @LastEditors: 靳肖健
 */
// 连主库
include 'conn_sql.php';

$u = isset($_POST["u"]) ? $_POST["u"] : '';
$c = isset($_POST["c"]) ? $_POST["c"]: '';
$a = isset($_POST["a"]) ? $_POST["a"] : '';
$n = isset($_POST["n"]) ? $_POST["n"]: '';
$i = isset($_POST["i"]) ? $_POST["i"]: '';
session_start();
if ($_SESSION['code']!=$u) {
	exit('{"code":0,"msg":"非法操作!"}');
}
 


// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 

$sql="INSERT INTO `2code_code` (`id`, `user`, `num`, `content`, `address`, `address_id`, `name`, `info`) VALUES (NULL, '".$u."', '0', '".$c."', '".$a."', '', '".$n."','".$i."')";


// echo ($sql);
$result = $conn->query($sql);

class Verify {
    public $code  = '00';
}
$verify = new Verify();

// var_dump($result);
if ($result){
    $verify->code = 1;
}else{
$verify->code = 0;
}
echo json_encode($verify);
mysqli_close($conn);

?>

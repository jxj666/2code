<?php
/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-01-25 13:29:44
 * @LastEditTime: 2020-01-21 10:56:37
 * @LastEditors: 靳肖健
 */
// 连主库
include 'conn_sql.php';

$u = isset($_GET["u"]) ? $_GET["u"] : '';
$p = isset($_GET["p"]) ? $_GET["p"]: '';
session_start();



// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 

$sql="SELECT * FROM 2code_user WHERE user = '".$u."' AND password='".$p."'";
 $result = $conn->query($sql);
class Verify {
    public $code  = '00';
    public $user = '00';
}
$verify = new Verify();
$verify->user = $u;

if ($result->num_rows > 0){
	$_SESSION['code'] = $u;
    $verify->code = 1;
}else{
$verify->code = 0;
}
echo json_encode($verify);
mysqli_close($conn);

?>